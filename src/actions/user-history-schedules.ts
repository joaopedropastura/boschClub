"use server";

import verifySession from "./verify-session";
import Event from "@/models/EventModel/event";

export default async function UserSchedulesHistory() {
  const session = await verifySession();

  const response = await fetch(
    `http://localhost:3000/api/event?id=${session?.user?.email}`
  );

  const data = (await response.json()) as Event;
  
  return data.events;
}
