import { db } from "@/lib/db";

export const getEventById = async (id: string) => {
  try {
    const event = await db.event.findUnique({
      where: {
        id: id,
      },
    });

    return event;
  } catch (error) {
    console.error("Error getting place by id", error);
    return null;
  }
};

export const getEventByRenterId = async (id: string) => {
  try {
    const events = await db.event.findMany({
      where: {
        renterId: id,
      },
    });

    return events;
  } catch (error) {
    console.error("Error getting place by id", error);
    return null;
  }
}


export const getEventByDate = async (date: Date) => {
  try {
    const events = await db.event.findMany({
      where: {
        date: date,
      },
    });

    return events;
  } catch (error) {
    console.error("Error getting place by id", error);
    return null;
  }
}