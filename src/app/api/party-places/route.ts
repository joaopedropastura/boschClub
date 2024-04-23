import { NextResponse, NextRequest } from "next/server";
import connectMongoDB from "@/config/mongodb";
import PartyPlace from "@/db-models/partyPlace/partyPlace";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string
}

export async function GET(): Promise<Response> {
  await connectMongoDB();

  const places = await PartyPlace.find();
  return NextResponse.json({ places }, {status: 200});
}

export async function POST(req: Request, res: NextApiResponse): Promise<Response> {
  await connectMongoDB();
  const data = await req.json();

  const newPartyPlace = {
    name: data.name,
    maxPeople: data.maxPeople
  }
  const newPlace = new PartyPlace( newPartyPlace );
  await newPlace.save();
  return NextResponse.json({ message: "Party place created" }, {status: 201});
}

export async function PUT(req: Request, res: NextApiResponse): Promise<Response> {
  await connectMongoDB();
  const { id } = await req.json();
  const { name, maxPeople } = req.json() as any;
  await PartyPlace.findByIdAndUpdate(id, { name, maxPeople });
  return NextResponse.json({ message: "Party place updated" }, {status: 200});
}

