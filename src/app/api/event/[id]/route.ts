"use server";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getEventByRenterId } from "@/data/event/event";
import { getPlaceById } from "@/data/place/place";
import { getUserById } from "@/data/user/user";
import { getTypePlaceById } from "@/data/place/type-of-place";

interface Context {
  params: {
    id: string;
  };
}

export async function DELETE( req : Request, context: Context): Promise<Response> {
  const { params } = context;
  try {
    await db.event.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: "Event deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}

export async function GET( req : Request, context: Context): Promise<Response> {
  const { params } = context;
  try {
    const events = await getEventByRenterId(params.id)
    if (!events) 
      return NextResponse.json({ message: "No events found" }, { status: 404 });


    const eventsWithPlace = await Promise.all(
      events.map(async (event) => {
        const place = await getPlaceById(event.placeId)
        return { 
          ...event, 
          place: {
            id: place?.id,
            name: place?.name,
            maxCapacity: place?.maxCapacity,
            type: place?.typeId
          }, 
        }
      }));

    const eventsWithPlaceType = await Promise.all(
      eventsWithPlace.map(async (event) => {
        const placeType = await getTypePlaceById(event.place.type!)
        return { 
          ...event, 
          typePlace: {
            name: placeType?.name
          }, 
        }
      }))

    const eventsWithRenter = await Promise.all(
      eventsWithPlaceType.map(async (event) => {
        const renter = await getUserById(event.renterId)
        return { 
          ...event, 
          renter: {
            name: renter?.name,
            email: renter?.email
          }, 
        }
      }));


      


    return NextResponse.json({ eventsWithRenter }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error: " + error }, { status: 500 });
  }
}
