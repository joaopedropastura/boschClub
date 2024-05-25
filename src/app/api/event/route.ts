import { NextResponse, NextRequest } from "next/server";
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";
import { getPlaceById } from "@/data/place/place";


type Event = {
  name: string;
  type: string;
  date: Date;
  placeId: string;
  userId: string;
};


export async function GET(): Promise<Response> {

  try {
    const events = await db.event.findMany();
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}




export async function POST(req: Request): Promise<Response> {
  const data = await req.json();

  const newEvent = {
    name: data.name,
    date: data.date,
    placeId: data.placeId,   
    renterId: data.renterId,
    startTime: data.startTime,
    endTime: data.endTime
  };


  try {
    await db.event.create({
      data: newEvent,
    });
    return NextResponse.json({ message: "Event created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}
