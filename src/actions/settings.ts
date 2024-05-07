"use server";

import { getUserByEmail, getUserById } from "@/data/user/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { genereateVerificationToken } from "@/lib/tokens";
import { settingsSchema } from "@/schemas/user";
import * as z from "zod";
import bcryptjs from "bcryptjs";

export default async function settings(values: z.infer<typeof settingsSchema>) {
  const user = await currentUser();

  if (!user) {
    return { error: "usuário não encontrado" };
  }
  const dbUser = await getUserById(user.id!);

  if (!dbUser) {
    return { error: "usuário não encontrado" };
  }

  if (user.isOauth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "email já cadastrado" };
    }

    const verificationToken = await genereateVerificationToken(values.email);

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "email de verificação enviado!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcryptjs.compare(
      values.password,
      dbUser.password
    );

    if (!passwordMatch) {
      return { error: "senha atual incorreta" };
    }

    const hashedPassword = await bcryptjs.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: { id: dbUser.id! },
    data: {
      ...values,
    },
  });

  return { success: "atualizado com sucesso" };
}
