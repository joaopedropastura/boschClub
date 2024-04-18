import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/config/mongodb";
import User from "@/models/user/user";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string
}

export async function GET(): Promise<Response> {
  await connectMongoDB();

  const users = await User.find();
  return NextResponse.json({ users }, {status: 200});
}

export async function POST(req: Request, res: NextApiResponse): Promise<Response> {
  await connectMongoDB();
  const data = await req.json();
  console.log("DATA: "+ data)
  const user = {
    name: data.name,
    edv: data.edv,
    email: data.email,
    password: data.password
  }
  const newUser = new User( user );
  try {
    await newUser.save();
    return NextResponse.json({ message: "User created" }, {status: 201});

  } catch (error) {
    return NextResponse.json({ message: "Error creating user" + error }, {status: 500});
  }
}

// export async function PUT(req: NextApiRequest, res: NextApiResponse): Promise<Response> {
//   await connectMongoDB();
//   const { id } = req.query;
//   const { name, maxPeople } = req.body;
//   await PartyPlace.findByIdAndUpdate(id, { name, maxPeople });
//   return NextResponse.json({ message: "Party place updated" }, {status: 200});
// }

