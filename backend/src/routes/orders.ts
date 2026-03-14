import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const router = Router()
const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Middleware to get current user
const authenticate = async (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  const token = authHeader.replace('Bearer ', '')
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }
    ;(req as any).user = user
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// Get user's orders
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user

    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    })

    res.json({ orders })
  } catch (error) {
    console.error('Get orders error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get single order
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = (req as any).user

    const order = await prisma.order.findFirst({
      where: { id, userId: user.id },
      include: { product: true, instance: true },
    })

    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    res.json({ order })
  } catch (error) {
    console.error('Get order error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Create order
router.post('/', authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user
    const { productId, type } = req.body

    const product = await prisma.product.findUnique({ where: { id: productId } })
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    if (product.stock < 1) {
      return res.status(400).json({ error: 'Product out of stock' })
    }

    const amount = type === 'MONTHLY' ? product.priceMonthly : product.priceHourly

    // Check balance
    if (user.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance. Please recharge.' })
    }

    // Create order and deduct balance
    const [order] = await prisma.$transaction([
      prisma.order.create({
        data: {
          userId: user.id,
          productId,
          type: type || 'HOURLY',
          amount,
          status: 'PENDING',
        },
        include: { product: true },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: { balance: { decrement: amount } },
      }),
      prisma.transaction.create({
        data: {
          userId: user.id,
          type: 'PAYMENT',
          amount: -amount,
          balance: user.balance - amount,
          description: `Order payment for ${product.name}`,
        },
      }),
    ])

    res.json({ order })
  } catch (error) {
    console.error('Create order error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Pay order (simplified - in production would integrate payment gateway)
router.post('/:id/pay', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = (req as any).user

    const order = await prisma.order.findFirst({
      where: { id, userId: user.id },
      include: { product: true },
    })

    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }

    if (order.status !== 'PENDING') {
      return res.status(400).json({ error: 'Order already processed' })
    }

    // For demo: mark as paid and create instance
    const [updatedOrder, instance] = await prisma.$transaction([
      prisma.order.update({
        where: { id },
        data: { status: 'PAID', paidAt: new Date() },
        include: { product: true },
      }),
      prisma.instance.create({
        data: {
          orderId: id,
          userId: user.id,
          productId: order.productId,
          status: 'RUNNING',
          ip: `10.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          port: 22,
          password: Math.random().toString(36).slice(-8),
        },
      }),
    ])

    // Update order with instance ID
    await prisma.order.update({
      where: { id },
      data: { status: 'ACTIVE', instanceId: instance.id },
    })

    res.json({ order: updatedOrder, instance })
  } catch (error) {
    console.error('Pay order error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export { router as ordersRouter }
