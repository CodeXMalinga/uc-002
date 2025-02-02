# Frontend Documentation

## Framework & Stack  
- **UI Framework:** Next.js (React) with TypeScript  
- **UI Library:** Shadcn UI (built on Radix UI + Tailwind CSS)  
- **Styling:** Tailwind CSS (utility-first CSS framework)  

## Navigation Structure  d
- **Primary Navigation:**  
  - **Top Menu (Responsive):**  
    - *Desktop:* Horizontal menu with links (Home, Track Order, Login/Signup).  
    - *Mobile:* Hamburger menu with collapsible items.  
  - **Admin Dashboard Navigation:**  
    - Sidebar with tabs for Orders, Customers, Settings.  

## Styling Approach  
- **Tailwind CSS Configuration:**  
  - Custom theme colors (e.g., brand colors for women’s t-shirts).  
  - Mobile-first responsive design using breakpoints (`sm`, `md`, `lg`).  
- **Shadcn UI Customization:**  
  - Override default component styles using Tailwind classes.  
  - Ensure accessibility (e.g., keyboard navigation, ARIA labels).  

## Key Components  
1. **Landing Page**  
   - Hero section showcasing t-shirt collections.  
   - Call-to-action buttons for tracking orders or signing up.  
2. **Customer Dashboard**  
   - Order history table with status badges (e.g., "Shipped," "Delivered").  
   - "Track Order" button linking to a detailed tracking page.  
3. **Admin Dashboard**  
   - Data grid for order management (filter by status, bulk actions).  
   - Status update modal with dropdowns (e.g., "Mark as Shipped").  
4. **Order Tracking Page**  
   - Timeline visualization of shipment progress.  
   - Estimated delivery date display.  

## State Management  
- **Local State:**  
  - React `useState` for form inputs and UI toggles (e.g., modals).  
- **Global State:**  
  - Zustand for shared state (e.g., user authentication status).  
- **Server State:**  
  - TanStack Query (React Query) for fetching/updating order data.  

## Forms  
- **Customer Registration/Login:**  
  - Formik + Yup validation for email/password inputs.  
  - Shadcn UI components (Input, Button, Label).  
- **Order Placement:**  
  - Multi-step form for shipping details and payment.  

## Error Handling in UI  
- **Toast Notifications:**  
  - Sonner for success/error messages (e.g., "Order updated!").  
- **Form Validation Errors:**  
  - Inline error messages using Shadcn’s `FormMessage` component.  

## Performance Optimization  
- **Code Splitting:**  
  - Next.js dynamic imports for admin dashboard (load on demand).  
- **Image Optimization:**  
  - Next.js `Image` component for optimized t-shirt product images.  

## Responsive Design  
- **Breakpoints:**  
  - Tailwind’s responsive utilities for grid layouts (e.g., `md:grid-cols-2`).  
- **Touch-Friendly Components:**  
  - Shadcn UI buttons and menus with padding for mobile interactions.  

## Testing Strategy  
- **Unit Tests:**  
  - Jest + React Testing Library for components (e.g., form submissions).  
- **E2E Tests:**  
  - Cypress for critical user flows (e.g., order placement, status update).  

## Accessibility (A11y)  
- **Semantic HTML:**  
  - Proper heading hierarchy (`h1`, `h2`) and landmark roles.  
- **Screen Reader Support:**  
  - Shadcn UI’s built-in accessibility features (e.g., focus management).  