import Image from "next/image"
import { NavBar } from "./components/nav-bar"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          {/* Hero Content */}
          <div className="space-y-6">
            <h1 className="font-playfair text-4xl md:text-6xl text-[#283044] leading-tight">
              Track Your Style Journey
            </h1>
            <p className="font-montserrat text-xl text-gray-600">
              Stay updated with your fashion deliveries in real-time. 
              Experience seamless tracking for your favorite t-shirt collections.
            </p>
            <div className="flex gap-4">
              <button className="bg-[#283044] text-white px-6 py-3 rounded-md hover:opacity-90 transition-opacity text-lg font-montserrat">
                Track Your Order
              </button>
              <button className="border-2 border-[#283044] text-[#283044] px-6 py-3 rounded-md hover:bg-[#283044] hover:text-white transition-colors text-lg font-montserrat">
                Shop Now
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/hero-img.jpg"
              alt="Fashion Shopping"
              fill
              className="object-cover"
              priority
            />
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#283044]/10 rounded-full blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#283044]/10 rounded-full blur-2xl"></div>
          </div>
        </div>
      </section>
    </main>
  )
}