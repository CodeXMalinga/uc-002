import { currentUser, clerkClient } from "@clerk/nextjs/server";
import { auth as getAuth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await getAuth();
  const user = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  // Check if user has admin role
  if (user?.publicMetadata.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
} 