"use server";

import * as z from "zod";

import { signIn } from "@/auth";
import { loginSchema } from "@/schemas/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { NextResponse } from "next/server";
import { AuthError } from "next-auth";

export default async function Login(values: z.infer<typeof loginSchema>) {
  const validetedFields = loginSchema.safeParse(values);

  if (!validetedFields.success)
    return {error: "Email or password not provider"}

  const { email, password } = validetedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return {success: "User found, an session was created"}

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {error : "Invalid credentials"};
        default:
          return {error : "Something went wrong"};
      }
    }

    throw error;
  }
}
