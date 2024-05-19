"use server";
import { NextResponse } from "next/server";
import { getEventByPlaceId } from "@/data/event/event";

interface Context {
  params: {
    id: string;
  };
}

export async function GET( req : Request, context: Context): Promise<Response> {
  const { params } = context;
  try {
    const events = await getEventByPlaceId(params.id)
    if (!events) 
      return NextResponse.json({ message: "No events found" }, { status: 404 });


    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}
