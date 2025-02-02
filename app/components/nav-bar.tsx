"use client"

import Link from "next/link"
import { UserButton, SignInButton, useUser } from "@clerk/nextjs"
import { CartButton } from "@/components/ui/cart-button"

export default function Navbar() {
  const { isSignedIn } = useUser()

  return (
    <nav className="fixed top-0 w-full bg-white border-b z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            The Fashion Store.
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          {isSignedIn && <CartButton />}
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </nav>
  )
}