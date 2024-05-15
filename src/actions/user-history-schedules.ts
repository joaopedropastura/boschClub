"use server";

import verifySession from "./verify-session";

export default async function UserSchedulesHistory() {
  const session = await verifySession();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/event/${session?.user?.id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();
  return data.events;
}
