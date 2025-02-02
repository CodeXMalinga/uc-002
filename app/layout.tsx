import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { Montserrat, Playfair_Display } from 'next/font/google'
import { Toaster } from 'sonner'

// Montserrat for body text
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
})

// Playfair Display for headings
const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body 
          className={`${montserrat.variable} ${playfair.variable} font-sans`}
          suppressHydrationWarning={true}
        >
          {children}
          <Toaster position="top-center" />

        </body>
      </html>
    </ClerkProvider>
  )
}