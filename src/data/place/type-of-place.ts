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


export const getTypePlaceById = async (id: string) => {
  try {
    const place = await db.typeOfPlace.findUnique({
      where: {
        id: id,
      },
    });

    return place;
  } catch (error) {
    console.error("Error getting type of place by id", error);
    return null;
  }
}


export const createTypePlace = async (data: any) => {
  const place = {
    name: data.name,
  };

  try {
    await db.typeOfPlace.create({
      data: place,
    });
    return { message: "Type of place created" };
  } catch (error) {
    return { message: "Error creating type of place" + error };
  }
};