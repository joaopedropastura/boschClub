"use server";

import * as z from "zod";

import { signIn } from "@/auth";
import { loginSchema } from "@/schemas/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { genereateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user/user";
import { sendVerificationEmail } from "@/lib/mail";

export default async function Login(values: z.infer<typeof loginSchema>) {
  const validetedFields = loginSchema.safeParse(values);

  if (!validetedFields.success)
    return { error: "Email ou senha não fornecidos" };

  const { email, password } = validetedFields.data;

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
