import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/config/mongodb";
import User from "@/db-models/user/user";
import type { NextApiRequest, NextApiResponse } from "next";

export async function GET(): Promise<Response> {
  await connectMongoDB();

  const users = await User.find();
  return NextResponse.json({ users }, {status: 200});
}

export async function POST(req: Request, res: NextApiResponse): Promise<Response> {
  await connectMongoDB();
  const data = await req.json();
  const user = {
    name: data.name,
    edv: data.edv,
    email: data.email,
    password: data.password,
  }
  const newUser = new User( user );
  try {

    if (!data.email || !data.password)
      return NextResponse.json({ message: "Email or password not provider" }, { status: 400 })

    const u = await User.findOne({ email: newUser.email });
    if (u) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const edv = await User.findOne({ edv: newUser.edv });
    if (edv) {
      return NextResponse.json({ message: "EDV already exists" }, { status: 400 });
    }

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

