import { getVerificationTokenByEmail } from "@/data/user/verification-token";
import { getPasswordResetTokenByEmail } from "@/data/user/password-reset-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hora

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
}

export const genereateVerificationToken = async (email: string) => {
  const token = uuidv4();

  const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hora

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      expires,
      email,
    },
  });

  return verificationToken;
};
