"use server";
import connectMongoDB from "@/config/mongodb";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import Event from "@/models/EventModel/event";

interface Context {
  params: {
    id: string;
  };
}


export async function GET( req : Request, context: Context): Promise<Response> {
  await connectMongoDB();

  const url = new URL(req.url);
  const email = url.searchParams.get("id");
  console.log(url)
  const { params } = context;
  
  try {
    const events = await Event.find({ "renter.email": params.id });
    if (events.length === 0) 
      return NextResponse.json({ message: "No events found" }, { status: 404 });
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}