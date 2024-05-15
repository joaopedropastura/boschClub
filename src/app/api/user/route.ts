import { NextResponse, NextRequest } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user/user";
import { genereateVerificationToken } from "@/lib/tokens";

import { sendVerificationEmail } from "@/lib/mail";

export async function GET(): Promise<Response> {

  try{
    const users = await db.user.findMany();
  
    return NextResponse.json({ users }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  
  }
}

export async function POST(
  req: Request,
  res: NextApiResponse
): Promise<Response> {
  const data = await req.json();

  const user = {
    name: data.name,
    edv: data.edv,
    email: data.email,
    password: data.password,
  };

  const exitstingUser = await getUserByEmail(user.email);
  try {
    if (exitstingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    await db.user.create({
      data: user,
    });
    const verificationToken = await genereateVerificationToken(user.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    
    return NextResponse.json(
      { message: "email enviado com sucesso" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user" + error },
      { status: 500 }
    );
  }
}
