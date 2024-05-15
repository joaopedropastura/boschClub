"use server"
import * as z from "zod";

import { registerPlaceSchema } from "@/schemas/place";

export default async function RegisterPlace(
  values: z.infer<typeof registerPlaceSchema>
) {
  
  const newPlace = {
    name: values.name,
    maxCapacity: values.maxCapacity,
    type: values.type,
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/place`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPlace),
  });

  const data = await response.json();

  return {
    data: data,
    status: response.status,
  };
}
