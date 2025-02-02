import  NavBar  from "@/app/components/nav-bar"

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <NavBar />
      <main className="pt-20">
        {children}
      </main>
    </div>
  )
}