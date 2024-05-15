import { db } from "@/lib/db";

export const getTypePlace = async () => {
  try {
    const places = await db.typeOfPlace.findMany()

    return places;
  } catch (error) {
    console.error("Error getting type of places", error);
    return null;
  }
};