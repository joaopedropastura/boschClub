"use server";

import * as z from "zod";

import { eventSchema } from "@/schemas/event";
const domain = process.env.NEXT_PUBLIC_APP_URL

export async function RegisterEvent(values: z.infer<typeof eventSchema>) {
  
    const newEvent = {
      name: values.name,
      date: values.date,
    place: {
      name: values.place.name,
      maxPeople: values.place.maxPeople,
    },
    renter: {
      name: values.renter.name,
      email: values.renter.email,
    }
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