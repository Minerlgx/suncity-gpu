import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const router = Router()
const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

// Validation schemas
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = registerSchema.parse(req.body)

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })

    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        balance: user.balance,
      },
      token,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors })
    }
    console.error('Register error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = loginSchema.parse(req.body)

    // Find user
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Verify password
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        balance: user.balance,
      },
      token,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors })
    }
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get current user
router.get('/me', async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ error: 'Not authenticated' })
    }

    const token = authHeader.replace('Bearer ', '')
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        balance: true,
        avatar: true,
        createdAt: true,
      },
    })

    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    res.json({ user })
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

// Logout (client-side token removal, but we acknowledge the request)
router.post('/logout', (req: Request, res: Response) => {
  res.json({ message: 'Logged out successfully' })
})

export { router as authRouter }
