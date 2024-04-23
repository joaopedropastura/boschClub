import { NextResponse } from "next/server";
import connectMongoDB from "@/config/mongodb";
import Event from "@/db-models/EventModel/event";
import { NextApiRequest } from "next";

export async function GET(): Promise<Response> {
  await connectMongoDB();

  try {
    const events = await Event.find();
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}

type Event = {
  name: string;
  date: string;
  place: {
    name: string;
    maxPeople: number;
  };
  renter: {
    name: string;
    email: string;
  };
  status: string;
  // description: string;
  // people: Array<object>;
  // additionals: Array<object>;

};

export async function POST(req: Request): Promise<Response> {
  await connectMongoDB();
  const data = await req.json();

  const newEvent: Event = {
    name: data.name,
    date: data.date,
    place: data.place,
    renter: data.renter,
    status: data.status,
    // description: data.description,
    // people: data.people,
    // additionals: data.additionals,
  };
  const event = new Event(newEvent);

  try {
    await event.save();
    return NextResponse.json({ message: "Event created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}
