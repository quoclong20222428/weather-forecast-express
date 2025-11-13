import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const deleteUserAccount = async (userId: string): Promise<void> => {
  try {
    // Xóa user (cascade sẽ xóa các saved cities tự động)
    await prisma.user.delete({
      where: { id: userId },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to delete user account: ${error.message}`);
    }
    throw error;
  }
};
