"use server";
import connectMongoDB from "@/config/mongodb";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import Event from "@/db-models/EventModel/event";

interface Context {
  params: {
    id: string;
  };
}

export async function GET( req : Request, context: Context): Promise<Response> {
  await connectMongoDB();
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
