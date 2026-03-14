import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const prisma = new PrismaClient()

async function main() {
  const dataPath = path.join(__dirname, '../data-export.json')
  
  if (!fs.existsSync(dataPath)) {
    console.log('No data file found. Please upload data-export.json to the backend folder.')
    return
  }
  
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
  
  // Import products
  if (data.products) {
    for (const product of data.products) {
      try {
        await prisma.product.upsert({
          where: { slug: product.slug },
          update: product,
          create: product,
        })
        console.log('Imported:', product.name)
      } catch (e) {
        console.log('Error importing product:', product.name, e.message)
      }
    }
  }
  
  // Import users (with password reset - they'll need to use forgot password or admin resets)
  if (data.users) {
    for (const user of data.users) {
      // Only import admin users, skip regular users as we don't have their passwords
      if (user.role === 'ADMIN') {
        try {
          const hashedPassword = await bcrypt.hash('admin123', 12)
          await prisma.user.upsert({
            where: { email: user.email },
            update: { role: 'ADMIN', balance: user.balance },
            create: {
              email: user.email,
              name: user.name,
              role: 'ADMIN',
              balance: user.balance || 1000,
              password: hashedPassword,
            },
          })
          console.log('Imported admin:', user.email, '(password: admin123)')
        } catch (e) {
          console.log('Error importing user:', user.email, e.message)
        }
      }
    }
  }
  
  console.log('\nImport complete!')
  console.log('Admin login: admin@dencone.com / admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
