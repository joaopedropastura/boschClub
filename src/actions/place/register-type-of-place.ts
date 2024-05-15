"use server"
import * as z from "zod";

import { TypeOfPlaceSchema } from "@/schemas/type-of-place";

export default async function RegisterTypeOfPlace(
  values: z.infer<typeof TypeOfPlaceSchema>
) {
  
  const newPlace = {
    name: values.name,
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/place/type-of-place`, {
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
