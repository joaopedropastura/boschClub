"use server";

import * as z from "zod";
import { eventSchema } from "@/schemas/event";
import { getPlaceById } from "@/data/place/place";
import { getTypePlaceById } from "@/data/place/type-of-place";
import { getUserById } from "@/data/user/user";
const domain = process.env.NEXT_PUBLIC_APP_URL;

function convertTimeToDateTime(date: Date, time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);
  const dateTime = new Date(date);
  dateTime.setHours(hours, minutes, 0, 0);
  return dateTime;
}

export async function RegisterEvent(values: z.infer<typeof eventSchema>) {
  const startTime = convertTimeToDateTime(values.date, values.startTime);
  const endTime = convertTimeToDateTime(values.date, values.endTime);

  const newEvent = {
    name: values.name,
    date: values.date,
    placeId: values.placeId,
    renterId: values.renterId,
    startTime: startTime,
    endTime: endTime,
  };
  const response = await fetch(`${domain}/api/event`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newEvent),
  });

  const data = await response.json();

  return {
    data: data,
    status: response.status,
  };
}

export async function GetPlaces() {
  const response = await fetch(`${domain}/api/party-places`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return {
    data: data,
    status: response.status,
  };
}

export async function GetEventsToAdminTable() {
  const response = await fetch(`${domain}/api/event`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  if (!data) {
    return {
      message: "No events found or the response is not an array",
      status: 404,
    };
  }

  const eventsWithPlace = await Promise.all(
    data.events.map(async (event: any) => {
      const place = await getPlaceById(event.placeId);
      return {
        ...event,
        place: {
          name: place?.name,
          maxPeople: place?.maxCapacity,
          typeId: place?.typeId,
        },
      };
    })
  );

  const eventsWithPlaceType = await Promise.all(
    eventsWithPlace.map(async (event) => {
      const placeType = await getTypePlaceById(event.place.typeId);
      return {
        ...event,
        typePlace: {
          name: placeType?.name,
        },
      };
    })
  );

  const eventsWithRenter = await Promise.all(
    eventsWithPlaceType.map(async (event) => {
      const renter = await getUserById(event.renterId);
      return {
        ...event,
        renter: {
          name: renter?.name,
          email: renter?.email,
        },
      };
    })
  );

  console.log(eventsWithRenter);

  return {
    data: eventsWithRenter,
    status: response.status,
  };
}

export async function GetEventsByPlaceId(id: string) {
  const response = await fetch(`${domain}/api/event/events-by-place-id/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data;
}

export async function GetEventsByRenterId(id: string) {
  const response = await fetch(
    `${domain}/api/event/events-by-renter-id/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();

  return data;
}
