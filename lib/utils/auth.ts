import { currentUser } from "@clerk/nextjs/server";

export async function checkUserRole() {
  const user = await currentUser();
  return {
    isAdmin: user?.publicMetadata.role === "admin",
    role: user?.publicMetadata.role as string || "customer",
  };
} 