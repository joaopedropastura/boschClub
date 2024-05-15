import { db } from "@/lib/db";

export const getPlaceById = async (id: string) => {
  try {
    const place = await db.place.findUnique({
      where: {
        id: id,
      },
    });

    return place;
  } catch (error) {
    console.error("Error getting place by id", error);
    return null;
  }
};

export const createPlace = async (data: any) => {
  const place = {
    name: data.name,
    type: data.type,
    maxCapacity: data.maxCapacity,
    renterId: data.renterId,
    placeId: data.placeId,
  };

  try {
    await db.place.create({
      data: place,
    });
    return { message: "Place created" };
  } catch (error) {
    return { message: "Error creating place" + error };
  }
};
