# Product Requirements Document (PRD)

## 1. Project Overview

The goal is to develop a web application for automating delivery notifications for a women’s t-shirt e-commerce platform. The system will use Next.js for full-stack development, PostgreSQL for order management, Clerk for authentication, and Resend for email notifications. Admins will update order statuses via a dashboard, triggering real-time email alerts to customers.

## 2. Key Features

- **Automated Email Notifications:**
  - Trigger emails when order status changes (e.g., "Shipped," "Delivered").
  - Localize emails by language/time zone.
  - Include delivery timelines and tracking links.

- **Order Management:**
  - Admins update order statuses via a dashboard.
  - Customers view real-time order statuses on a tracking page.
  - Filter orders by status (Pending/Shipped/Delivered).

- **User Registration & Authentication:**
  - Email/password sign-up/login with Clerk.
  - Role-based access (Customer/Admin).

- **Compliance:**
  - GDPR/CCPA-compliant data handling.
  - Secure storage of customer data.

## 3. User Journey

1. **Customer Flow:**
   - Sign up/login.
   - Place an order.
   - Receive email confirmation.
   - Track order status via dashboard.
   - Get automated emails on status changes.

2. **Admin Flow:**
   - Log into the admin dashboard.
   - Update order statuses.
   - View all orders and customer details.

## 4. Technical Requirements

- **Frontend:**
  - Framework: Next.js (TypeScript)
  - UI Components: Shadcn + Tailwind CSS
  - State Management: Zustand
  - Notifications: Sonner (toasts)

- **Backend:**
  - Database: PostgreSQL
  - ORM: Prisma
  - Authentication: Clerk
  - Email Service: Resend

- **Environment Setup:**
  - Development: Local PostgreSQL + Docker
  - Production: Vercel (Frontend), AWS RDS (PostgreSQL)

## 5. Detailed Requirements

### 5.1. Automated Email Notifications

- **Triggers:**
  - Order confirmation (POST /orders).
  - Status change (PATCH /orders/{id}).
  - Delivery reminder (1 hour pre-delivery).

- **Email Content:**
  - Localized language and timestamps.
  - Order ID, status, and tracking link.
  - Branded templates using Resend React SDK.

- **Validation:**
  - Ensure emails are not marked as spam.
  - Handle bounce/failure events via Resend webhooks.

### 5.2. Order Management

- **Admin Dashboard:**
  - Data grid with filters (status, date).
  - Bulk actions (export CSV, mark as shipped).
  - Status update modal with dropdown.

- **Customer Tracking Page:**
  - Timeline visualization of order progress.
  - Estimated delivery date.

### 5.3. User Authentication

- **Clerk Integration:**
  - Pre-built sign-up/login forms.
  - Session management with JWT.
  - Admin role assignment via Clerk Organizations.

## 6. Acceptance Criteria

- **Email Notifications:**
  - Emails sent within 10 seconds of status changes.
  - 90% email open rate.

- **Order Management:**
  - Admins can update statuses within 2 clicks.
  - Customers see updated statuses in real time.

- **Authentication:**
  - Users can sign up/login in <15 seconds.
  - Admins have exclusive access to the dashboard.

## 7. Assumptions and Dependencies

- Resend API keys and Clerk credentials are provided.
- AWS RDS PostgreSQL instance is provisioned.
- Localization translations (e.g., Spanish, French) are available.

## 8. Glossary

- **Clerk:** Authentication-as-a-service platform.
- **Resend:** Transactional email API.
- **Prisma:** TypeScript ORM for PostgreSQL.
- **Zustand:** Global state management library.

## 9. Appendices

- **Appendix A:** API Documentation
  - [Clerk API Reference](https://clerk.com/docs)
  - [Resend API Docs](https://resend.com/docs/api-reference/emails/send-email)
  - [Prisma Schema Reference](https://www.prisma.io/docs/orm/reference/prisma-schema-reference)

---

## 10. Step-by-Step Development Plan

1. **Project Initialization:**
   - Set up Next.js with TypeScript and Shadcn.
   - Configure Tailwind CSS theme (brand colors, fonts).

2. **Authentication Setup:**
   - Integrate Clerk for user registration/login.
   - Implement role-based routing (Admin/Customer).

3. **Order Management System:**
   - Design PostgreSQL schema (Users, Orders, Products).
   - Build admin dashboard with data grid and filters.
   - Create API routes for CRUD operations (`/api/orders`).

4. **Email Notifications:**
   - Integrate Resend for transactional emails.
   - Build email templates with React components.

5. **Customer-Facing Features:**
   - Develop order tracking page with timeline UI.
   - Implement real-time status updates via Zustand.

6. **Testing & Compliance:**
   - Add GDPR/CCPA consent checkboxes during sign-up.
   - Conduct load testing for email delivery.

7. **Deployment:**
   - Deploy frontend to Vercel.
   - Configure AWS RDS for PostgreSQL.

---

## 11. Important Implementation Notes

### 1. Project Setup
- Use Next.js 15 App Router.
- Components in `/components` (e.g., `order-timeline.tsx`).
- Pages in `/app` (e.g., `/app/dashboard/page.tsx`).

### 2. Server-Side Logic
```tsx
// Example: Server action to update order status
"use server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

export async function updateOrder(orderId: string, status: string) {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
  
  // Send email via Resend
  await resend.emails.send({
    from: "orders@tshirtstore.com",
    to: order.user.email,
    subject: `Order ${status}`,
    react: <OrderStatusEmail status={status} />,
  });
}