"use server";

import verifySession from "./verify-session";
import Event from "@/models/EventModel/event";


type Event = {
    events: Array<{
        name: string;
        date: string;
        place: {
        name: string;
        maxPeople: number;
        };
        renter: {
        name: string;
        email: string;
        };
        status: string;
    }>;
    };

export default async function UserSchedulesHistory() {
  const session = await verifySession();

  const response = await fetch(
    `http://localhost:3000/api/event?id=${session?.user?.email}`
  );

  const data : Event = (await response.json());
  console.log(data)
  return data.events;
}
