import { NextResponse } from "next/server";
import connectMongoDB from "@/config/mongodb";
import Event from "@/models/EventModel/event";

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
    // description: string;
    // people: Array<object>;
    // renter: object;
    // additionals: Array<object>;
};

export async function POST(req: Request): Promise<Response> {
  await connectMongoDB();
  const data = await req.json();

  const newEvent : Event = {
    name: data.name,
    date: data.date,
    place: data.place,
    // description: data.description,
    // people: data.people,
    // renter: data.renter,
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
