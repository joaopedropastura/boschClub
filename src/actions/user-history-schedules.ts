"use server";

import verifySession from "./verify-session";
import Event from "@/db-models/EventModel/event";


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
    `${process.env.NEXT_PUBLIC_APP_URL}/api/event/${session?.user?.email}`
  );

  const data = await response.json();
  return data.events;
}
