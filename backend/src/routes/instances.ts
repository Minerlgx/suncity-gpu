import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const router = Router()
const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

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

// Get user's instances
router.get('/', authenticate, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user

    const instances = await prisma.instance.findMany({
      where: { userId: user.id },
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    })

    res.json({ instances })
  } catch (error) {
    console.error('Get instances error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get single instance
router.get('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = (req as any).user

    const instance = await prisma.instance.findFirst({
      where: { id, userId: user.id },
      include: { product: true, order: true },
    })

    if (!instance) {
      return res.status(404).json({ error: 'Instance not found' })
    }

    res.json({ instance })
  } catch (error) {
    console.error('Get instance error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Start instance
router.post('/:id/start', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = (req as any).user

    const instance = await prisma.instance.findFirst({
      where: { id, userId: user.id },
    })

    if (!instance) {
      return res.status(404).json({ error: 'Instance not found' })
    }

    if (instance.status === 'RUNNING') {
      return res.status(400).json({ error: 'Instance already running' })
    }

    const updated = await prisma.instance.update({
      where: { id },
      data: { status: 'RUNNING', startedAt: new Date() },
    })

    res.json({ instance: updated })
  } catch (error) {
    console.error('Start instance error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Stop instance
router.post('/:id/stop', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = (req as any).user

    const instance = await prisma.instance.findFirst({
      where: { id, userId: user.id },
    })

    if (!instance) {
      return res.status(404).json({ error: 'Instance not found' })
    }

    if (instance.status !== 'RUNNING') {
      return res.status(400).json({ error: 'Instance not running' })
    }

    const updated = await prisma.instance.update({
      where: { id },
      data: { status: 'STOPPED' },
    })

    res.json({ instance: updated })
  } catch (error) {
    console.error('Stop instance error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete/terminate instance
router.delete('/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = (req as any).user

    const instance = await prisma.instance.findFirst({
      where: { id, userId: user.id },
    })

    if (!instance) {
      return res.status(404).json({ error: 'Instance not found' })
    }

    await prisma.instance.update({
      where: { id },
      data: { status: 'TERMINATED' },
    })

    // Update associated order
    await prisma.order.update({
      where: { id: instance.orderId },
      data: { status: 'COMPLETED' },
    })

    res.json({ message: 'Instance terminated successfully' })
  } catch (error) {
    console.error('Delete instance error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export { router as instancesRouter }
