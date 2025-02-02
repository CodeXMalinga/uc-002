import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "../prisma";

export async function checkUserRole() {
  const user = await currentUser();
  return {
    isAdmin: user?.publicMetadata.role === "admin",
    role: user?.publicMetadata.role as string || "customer",
  };
} 

export async function syncUser(userId: string, email: string, name?: string) {
  try {
    const user = await prisma.user.upsert({
      where: { id: userId },
      update: {
        email,
        name: name || null,
      },
      create: {
        id: userId,
        email,
        name: name || null,
      },
    });
    return user;
  } catch (error) {
    console.error('Error syncing user:', error);
    throw error;
  }
}

export async function validateUser(userId: string) {
  if (!userId) return null;
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    return user;
  } catch (error) {
    console.error('Error validating user:', error);
    return null;
  }
}