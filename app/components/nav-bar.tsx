import Link from "next/link"
import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs"

export function NavBar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo/Store Name */}
        <Link href="/" className="font-playfair text-2xl text-[#283044]">
          The Fashion Store.
        </Link>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton 
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10"
                }
              }}
            />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-[#283044] text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity font-montserrat">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  )
}