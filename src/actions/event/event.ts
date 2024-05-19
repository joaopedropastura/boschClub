"use server";

import * as z from "zod";

import { eventSchema } from "@/schemas/event";
const domain = process.env.NEXT_PUBLIC_APP_URL

export async function RegisterEvent(values: z.infer<typeof eventSchema>) {
  
    const newEvent = {
      name: values.name,
      date: values.date,
      placeId: values.placeId,
      renterId: values.renterId
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