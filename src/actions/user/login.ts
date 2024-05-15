"use server";

import * as z from "zod";

import {
  generateTwoFactorToken,
  genereateVerificationToken,
} from "@/lib/tokens";
import { signIn } from "@/auth";
import { loginSchema } from "@/schemas/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user/user";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { getTwoFactorTokenByEmail } from "@/data/user/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationById } from "@/data/user/two-factor-confirmation";

export default async function Login(values: z.infer<typeof loginSchema>) {
  const validetedFields = loginSchema.safeParse(values);

  if (!validetedFields.success)
    return { error: "Email ou senha não fornecidos" };

  const { email, password, code } = validetedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Usuário não encontrado" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await genereateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      success:
        "Um novo email de verificação foi reenviado. Por favor, confirme seu email.",
    };
  }

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Token inválido" };
      }

      if (twoFactorToken.token !== code) {
        return { error: "código inválido" };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Código expirado" };
      }

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const existingConfirmation = await getTwoFactorConfirmationById(
        existingUser.id
      );

      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      return { twoFactor: true };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Usuario encontrado, uma sessão foi criada" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciais inválidas" };
        default:
          return { error: "Ocorreu um erro" };
      }
    }

    throw error;
  }
}
