import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// Get all products
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, featured } = req.query

    const where: any = {}
    if (category) where.category = category as string
    if (featured) where.featured = featured === 'true'

    const products = await prisma.product.findMany({
      where,
      orderBy: { priceHourly: 'asc' },
    })

    res.json({ products })
  } catch (error) {
    console.error('Get products error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get single product
router.get('/:idOrSlug', async (req: Request, res: Response) => {
  try {
    const { idOrSlug } = req.params

    // Try to find by ID first, then by slug
    let product = await prisma.product.findUnique({
      where: { id: idOrSlug },
    })

    if (!product) {
      product = await prisma.product.findUnique({
        where: { slug: idOrSlug },
      })
    }

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json({ product })
  } catch (error) {
    console.error('Get product error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get categories
router.get('/meta/categories', async (req: Request, res: Response) => {
  try {
    const categories = await prisma.product.groupBy({
      by: ['category'],
      where: { status: 'ACTIVE' },
      _count: { id: true },
    })

    res.json({
      categories: categories.map((c) => ({
        name: c.category,
        count: c._count.id,
      })),
    })
  } catch (error) {
    console.error('Get categories error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export { router as productsRouter }
