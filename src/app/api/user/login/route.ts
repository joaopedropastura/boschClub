import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/config/mongodb";
import User from "@/db-models/user/user";
import type { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user/user";
import { genereateVerificationToken } from "@/lib/tokens";

export async function POST(
  req: Request,
  res: NextApiResponse
): Promise<Response> {
  const data = await req.json();

  if (!data.email || !data.password)
    return NextResponse.json(
      { message: "Email or password not provider" },
      { status: 400 }
    );

  const existingUser = await getUserByEmail(data.email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await genereateVerificationToken(
      existingUser.email
    );

    return NextResponse.json(
      { message: "Email de verificação reenviado" },
      { status: 401 }
    );
  }

  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return NextResponse.json(
      { message: "User found, an session was created" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return NextResponse.json(
            { message: "Invalid credentials" },
            { status: 401 }
          );
        default:
          return NextResponse.json(
            { message: "An error occurred" },
            { status: 500 }
          );
      }
    }

    throw error;
  }
}
