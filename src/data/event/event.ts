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


export const getEventByUserId = async (id : string) => {
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

export const getEventByPlaceId = async (id: string) => {
  try {
    const events = await db.event.findMany({
      where: {
        placeId: id,
      },
    });

    return events;
  } catch (error) {
    console.error("Error getting place by id", error);
    return null;
  }
}


export const getEventByPlaceIdAndDate = async (id: string, date: Date) => {
  try {
    const events = await db.event.findMany({
      where: {
        placeId: id,
        date: date,
      },
    });

    return events;
  } catch (error) {
    console.error("Error getting place by id in this date", error);
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


export const deleteEventById = async (id: string) => {
  try {
    await db.event.delete({
      where: {
        id: id,
      },
    });

    return { message: "Event deleted" };
  } catch (error) {
    return { message: "Error deleting event" + error };
  }
}