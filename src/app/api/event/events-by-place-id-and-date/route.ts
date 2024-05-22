"use server";
import { NextResponse } from "next/server";
import { getEventByPlaceIdAndDate } from "@/data/event/event";

interface Context {
  params: {
    placeId: string;
    date: Date;
  };
}

export async function POST(req: Request): Promise<Response> {
  const data = await req.json() as Context["params"];
  
  try {
    const events = await getEventByPlaceIdAndDate(data.placeId, data.date)
    if (!events) 
      return NextResponse.json({ message: "No events found" }, { status: 404 });


    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}
