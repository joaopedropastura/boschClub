import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/config/mongodb";
import User from "@/db-models/user/user";
import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(
  req: Request,
  res: NextApiResponse
): Promise<Response> {
  await connectMongoDB();
  
  const data = await req.json();

  console.log(data)
  if (!data.email || !data.password)
    return NextResponse.json({ message: "Email or password not provider" }, { status: 400 })

  try {
      const users = await User.findOne({ email: data.email });
        if (!users) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        if (users.password !== data.password) {
            return NextResponse.json({ message: "Password incorrect" }, { status: 400 });
        }

    
    return NextResponse.json({ message: "User found, an session was created" }, { status: 200 });
    
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { message: "something wrong"},
      { status: 500 }
    );
  }
}