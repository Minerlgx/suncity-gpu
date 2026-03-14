import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = Router()
const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

const authenticateAdmin = async (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  const token = authHeader.replace('Bearer ', '')
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Admin access required' })
    }
    ;(req as any).user = user
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// Admin login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || user.role !== 'ADMIN') {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.error('Admin login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Dashboard stats
router.get('/stats', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const totalUsers = await prisma.user.count()
    const activeInstances = await prisma.instance.count({ 
      where: { status: 'RUNNING' } as any 
    })
    const totalOrders = await prisma.order.count()
    const revenue = await prisma.order.aggregate({
      _sum: { amount: true },
      where: { status: { in: ['PAID', 'ACTIVE', 'COMPLETED'] } as any },
    })

    res.json({
      stats: {
        totalUsers,
        activeInstances,
        totalOrders,
        revenue: revenue._sum.amount || 0,
      },
    })
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all users
router.get('/users', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        balance: true,
        createdAt: true,
        _count: { select: { orders: true, instances: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    res.json({ users })
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update user
router.patch('/users/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { role, balance, name } = req.body

    const user = await prisma.user.update({
      where: { id },
      data: { role, balance, name },
      select: { id: true, email: true, name: true, role: true, balance: true },
    })

    res.json({ user })
  } catch (error) {
    console.error('Update user error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all orders
router.get('/orders', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: { select: { id: true, email: true, name: true } },
        product: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    res.json({ orders })
  } catch (error) {
    console.error('Get orders error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get all products
router.get('/products', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { priceHourly: 'asc' },
    })

    res.json({ products })
  } catch (error) {
    console.error('Get products error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Create/update product
router.post('/products', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { id, ...data } = req.body

    if (id) {
      const product = await prisma.product.update({
        where: { id },
        data,
      })
      res.json({ product })
    } else {
      const product = await prisma.product.create({ data })
      res.json({ product })
    }
  } catch (error) {
    console.error('Save product error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export { router as adminRouter }
