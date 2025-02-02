# Backend Documentation

## Framework & Stack  
- **Backend Framework:** Next.js (API Routes + Server Actions)  
- **Database:** PostgreSQL (relational database for orders, users, and products)  
- **ORM:** Prisma (TypeScript-first ORM for PostgreSQL interactions)  
- **Authentication:** Clerk (pre-built auth components and user management)  

---

## Database Schema Design  
### Entities & Relationships  
```prisma
model User {
  id          String    @id @default(cuid())
  email       String    @unique
  name        String?
  createdAt   DateTime  @default(now())
  orders      Order[]
}

model Order {
  id          String    @id @default(cuid())
  status      String    // "pending", "shipped", "delivered"
  productId   String
  userId      String
  user        User      @relation(fields: [userId], references: [id])
  product     Product   @relation(fields: [productId], references: [id])
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
}

model Product {
  id          String    @id @default(cuid())
  name        String
  price       Float
  description String?
  imageUrl    String?
  orders      Order[]
}