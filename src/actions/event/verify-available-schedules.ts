"use server";

import * as z from "zod";

import { eventAvailableSchema } from "@/schemas/event";
const domain = process.env.NEXT_PUBLIC_APP_URL


export async function VerifyAvailableSchedules(values: z.infer<typeof eventAvailableSchema>) {
  
    const eventData = {
      date: values.date,
      placeId: values.placeId
  };

  const response = await fetch(`${domain}/api/event/events-by-place-id-and-date`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

    const data = await response.json();

    console.log(data.events)
    return data.events

}