import { PrismaClient, ProductStatus } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

// Product data with Asia-Pacific datacenters
const products = [
  // H100 Series
  {
    name: 'H100 80GB - Malaysia',
    slug: 'h100-80gb-malaysia',
    category: 'AI Training',
    descriptionEn: 'Industry-leading H100 80GB GPU in our Malaysia datacenter. Perfect for LLMs, transformer models, and enterprise AI workloads. Low latency for Southeast Asia.',
    descriptionJa: '马来西亚数据中心的HBM3内存行业领先AI培训GPU。优化用于大型语言模型和Transformer工作负载。',
    specs: {
      gpu: 'NVIDIA H100 80GB SXM',
      vram: '80GB HBM3',
      cpu: 'AMD EPYC 7763 64 cores',
      ram: '512GB DDR5',
      storage: '2TB NVMe Gen4',
      network: '10Gbps',
      datacenter: 'Malaysia (KL)',
    },
    priceHourly: 2.50,
    priceMonthly: 1500,
    stock: 20,
    featured: true,
  },
  {
    name: 'H100 80GB - Japan',
    slug: 'h100-80gb-japan',
    category: 'AI Training',
    descriptionEn: 'Premium H100 80GB in Tokyo datacenter. Ultra-low latency for Japan and East Asia. Enterprise-grade reliability.',
    descriptionJa: '东京数据中心的H100 80GB。日本和东亚的超低延迟。企业级可靠性。',
    specs: {
      gpu: 'NVIDIA H100 80GB SXM',
      vram: '80GB HBM3',
      cpu: 'AMD EPYC 7763 64 cores',
      ram: '512GB DDR5',
      storage: '2TB NVMe Gen4',
      network: '10Gbps',
      datacenter: 'Japan (Tokyo)',
    },
    priceHourly: 2.80,
    priceMonthly: 1680,
    stock: 15,
    featured: true,
  },
  {
    name: 'H100 80GB - Indonesia',
    slug: 'h100-80gb-indonesia',
    category: 'AI Training',
    descriptionEn: 'H100 80GB hosted in Jakarta datacenter. Ideal for Southeast Asian deployments with excellent regional connectivity.',
    descriptionJa: '雅加达数据中心的H100 80GB。非常适合东南亚部署，区域连接优秀。',
    specs: {
      gpu: 'NVIDIA H100 80GB SXM',
      vram: '80GB HBM3',
      cpu: 'AMD EPYC 7763 64 cores',
      ram: '512GB DDR5',
      storage: '2TB NVMe Gen4',
      network: '10Gbps',
      datacenter: 'Indonesia (Jakarta)',
    },
    priceHourly: 2.50,
    priceMonthly: 1500,
    stock: 10,
    featured: false,
  },
  // H200 Series
  {
    name: 'H200 141GB - Japan',
    slug: 'h200-141gb-japan',
    category: 'AI Training',
    descriptionEn: 'Next-gen H200 with 141GB HBM3e memory in Tokyo. Designed for the largest models and longest context windows.',
    descriptionJa: '东京的下一代H200，配备141GB HBM3e内存。为最大模型和最长上下文窗口设计。',
    specs: {
      gpu: 'NVIDIA H200 141GB SXM',
      vram: '141GB HBM3e',
      cpu: 'AMD EPYC 7763 64 cores',
      ram: '512GB DDR5',
      storage: '2TB NVMe Gen5',
      network: '10Gbps',
      datacenter: 'Japan (Tokyo)',
    },
    priceHourly: 3.50,
    priceMonthly: 2100,
    stock: 8,
    featured: true,
  },
  // A100 Series
  {
    name: 'A100 80GB - Malaysia',
    slug: 'a100-80gb-malaysia',
    category: 'AI Training',
    descriptionEn: 'Proven A100 80GB for production AI workloads. Cost-effective solution with MIG technology.',
    descriptionJa: '用于生产AI工作负载的经验证的A100 80GB。带有MIG技术的成本效益解决方案。',
    specs: {
      gpu: 'NVIDIA A100 80GB SXM',
      vram: '80GB HBM2e',
      cpu: 'AMD EPYC 7763 64 cores',
      ram: '256GB DDR4',
      storage: '1TB NVMe Gen4',
      network: '10Gbps',
      datacenter: 'Malaysia (KL)',
    },
    priceHourly: 2.00,
    priceMonthly: 1200,
    stock: 15,
    featured: false,
  },
  // RTX 4090
  {
    name: 'RTX 4090 x4 - Japan',
    slug: 'rtx-4090-x4-japan',
    category: 'Training',
    descriptionEn: '4x RTX 4090 cluster in Tokyo. High性价比 for research, development, and prototyping AI models.',
    descriptionJa: '东京的4x RTX 4090集群。研究、开发和AI模型原型制作的高性价比。',
    specs: {
      gpu: 'NVIDIA RTX 4090 (x4)',
      vram: '24GB GDDR6X (x4)',
      cpu: 'AMD EPYC 7763 64 cores',
      ram: '256GB DDR5',
      storage: '2TB NVMe Gen4',
      network: '10Gbps',
      datacenter: 'Japan (Tokyo)',
    },
    priceHourly: 2.80,
    priceMonthly: 1680,
    stock: 10,
    featured: false,
  },
  {
    name: 'RTX 4090 x8 - Malaysia',
    slug: 'rtx-4090-x8-malaysia',
    category: 'AI Training',
    descriptionEn: '8x RTX 4090 cluster for deep learning training. Maximum performance for your budget.',
    descriptionJa: '用于深度学习培训的8x RTX 4090集群。在您的预算范围内获得最大性能。',
    specs: {
      gpu: 'NVIDIA RTX 4090 (x8)',
      vram: '24GB GDDR6X (x8)',
      cpu: 'AMD EPYC 7763 64 cores',
      ram: '512GB DDR5',
      storage: '4TB NVMe Gen4',
      network: '10Gbps',
      datacenter: 'Malaysia (KL)',
    },
    priceHourly: 5.00,
    priceMonthly: 3000,
    stock: 5,
    featured: true,
  },
  {
    name: 'RTX 4090 Single',
    slug: 'rtx-4090-single',
    category: 'Inference',
    descriptionEn: 'Single RTX 4090 for development, testing, and small-scale inference workloads.',
    descriptionJa: '用于开发、测试和小规模推理工作负载的单个RTX 4090。',
    specs: {
      gpu: 'NVIDIA RTX 4090',
      vram: '24GB GDDR6X',
      cpu: 'AMD EPYC 7763 32 cores',
      ram: '128GB DDR5',
      storage: '1TB NVMe Gen4',
      network: '1Gbps',
      datacenter: 'Malaysia (KL)',
    },
    priceHourly: 0.80,
    priceMonthly: 480,
    stock: 50,
    featured: false,
  },
  // Inference Optimized
  {
    name: 'H100 Inference - Japan',
    slug: 'h100-inference-japan',
    category: 'Inference',
    descriptionEn: 'H100 optimized specifically for inference. Lower cost per token with vLLM deployment.',
    descriptionJa: '专门为推理优化的H100。使用vLLM部署降低每个token的成本。',
    specs: {
      gpu: 'NVIDIA H100 80GB',
      vram: '80GB HBM3',
      cpu: 'Intel Xeon 8478 48 cores',
      ram: '256GB DDR5',
      storage: '1TB NVMe Gen4',
      network: '10Gbps',
      datacenter: 'Japan (Tokyo)',
    },
    priceHourly: 1.80,
    priceMonthly: 1080,
    stock: 30,
    featured: false,
  },
  // Budget Options
  {
    name: 'RTX 4080 SUPER',
    slug: 'rtx-4080-super',
    category: 'Inference',
    descriptionEn: 'Budget-friendly option for development and testing. Great for prototyping.',
    descriptionJa: '开发和测试的预算友好选项。非常适合原型制作。',
    specs: {
      gpu: 'NVIDIA RTX 4080 SUPER',
      vram: '16GB GDDR6X',
      cpu: 'AMD EPYC 7763 16 cores',
      ram: '64GB DDR5',
      storage: '512GB NVMe Gen4',
      network: '1Gbps',
      datacenter: 'Malaysia (KL)',
    },
    priceHourly: 0.50,
    priceMonthly: 300,
    stock: 50,
    featured: false,
  },
]

async function main() {
  console.log('Seeding database...')

  // Delete all existing products first
  await prisma.product.deleteMany()
  console.log('Deleted all existing products')

  // Create products
  for (const product of products) {
    const data = {
      name: product.name,
      slug: product.slug,
      category: product.category,
      description: product.descriptionEn,
      descriptionJa: product.descriptionJa,
      specs: product.specs as any,
      pricing: { hourly: product.priceHourly, monthly: product.priceMonthly },
      priceHourly: product.priceHourly,
      priceMonthly: product.priceMonthly,
      stock: product.stock,
      featured: product.featured,
      status: ProductStatus.ACTIVE,
      images: [],
    }

    await prisma.product.create({ data })
    console.log(`Created: ${product.name}`)
  }

  // Create admin user
  const adminEmail = 'admin@suncityd.com'
  const adminExists = await prisma.user.findUnique({ where: { email: adminEmail } })
  
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash('admin123', 12)
    await prisma.user.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
        name: 'Admin',
        role: 'ADMIN',
        balance: 1000,
      },
    })
    console.log('Created admin account: admin@suncityd.com / admin123')
  } else {
    console.log('Admin account already exists')
  }

  console.log(`\nSeeding complete! Created ${products.length} products.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
