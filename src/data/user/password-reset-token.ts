import { db } from "@/lib/db";

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const token = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });

    return token;
  } catch (error) {
    console.error("Error getting password reset token by email", error);
    return null;
  }
};

export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });

    return passwordResetToken;
  } catch (error) {
    console.error("Error getting password reset token by email", error);
    return null;
  }
};
