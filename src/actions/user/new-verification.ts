"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user/user";
import { getVerificationTokenByToken } from "@/data/user/verification-token";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) 
    return { error: "Token não encontrado" };

  const tokenHasExpired = new Date(existingToken.expires) < new Date();

  if (tokenHasExpired) 
    return { error: "Token expirado" };

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) 
    return { error: "Email não encontrado" };

  await db.user.update({
    where: { email: existingToken.email },
    data: { 
        emailVerified: new Date(),
        email: existingToken.email,
    },

  });

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { message: "Email verificado com sucesso!" };
}
