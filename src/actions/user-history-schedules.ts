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

  console.log(session?.user?.email);

  const response = await fetch(
    `${process.env.URL}/api/event/${session?.user?.email}`
  );

  const data = await response.json();
  return data.events;
}
