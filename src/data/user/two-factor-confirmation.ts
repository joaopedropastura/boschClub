import { db } from "@/lib/db";

export const getTwoFactorConfirmationById = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    });

    return twoFactorConfirmation;
  } catch (err) {
    return null;
  }
};
