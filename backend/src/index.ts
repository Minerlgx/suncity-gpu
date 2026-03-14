import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { authRouter } from './routes/auth.js'
import { productsRouter } from './routes/products.js'
import { ordersRouter } from './routes/orders.js'
import { instancesRouter } from './routes/instances.js'
import { adminRouter } from './routes/admin.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'

app.use(cors({
  origin: true, // Allow all origins for development
  credentials: true,
}))
app.use(express.json())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/orders', ordersRouter)
app.use('/api/instances', instancesRouter)
app.use('/api/admin', adminRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: {
      nodeEnv: process.env.NODE_ENV,
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      hasJwtSecret: !!process.env.JWT_SECRET,
    }
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
