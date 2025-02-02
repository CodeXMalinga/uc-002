import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing products (optional)
  await prisma.product.deleteMany({})

  const products = [
    {
      name: "Classic White T-Shirt",
      price: 29.99,
      description: "Essential women's cotton crew neck t-shirt in pristine white",
      imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Vintage Black V-Neck",
      price: 34.99,
      description: "Soft cotton blend v-neck with a relaxed fit",
      imageUrl: "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Organic Cotton Striped Tee",
      price: 39.99,
      description: "Navy and white striped organic cotton t-shirt",
      imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Premium Graphic Print Tee",
      price: 44.99,
      description: "Artist-designed graphic print on premium cotton",
      imageUrl: "https://images.unsplash.com/photo-1503342250614-ca440786f637?w=800",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Cropped Summer T-Shirt",
      price: 32.99,
      description: "Trendy cropped length t-shirt perfect for summer",
      imageUrl: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]

  for (const product of products) {
    await prisma.product.create({
      data: product
    })
  }

  console.log('Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })