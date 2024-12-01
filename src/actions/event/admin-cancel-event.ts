"use server";

import * as z from "zod";
import { eventSchema } from "@/schemas/event";
import { getEventById } from "@/data/event/event";
import { getUserById } from "@/data/user/user";
import { sendEventCanceledEmail } from "@/lib/mail";
import { getPlaceById } from "@/data/place/place";

type EventModel = {
    id: string;
    name: string;
    date: Date;
    placeId: string;
    renterId: string;
    startTime: Date | null;
    endTime: Date | null;
  };
  

export async function AdminDeleteEvent(id : string, reason: string) {

    const event = await getEventById(id);
    const dataPlace = await getPlaceById(event?.placeId!);
    const dataUser = await getUserById(event?.renterId!);

    await sendEventCanceledEmail(dataUser?.email!, dataPlace?.name!, event?.date.toString()!, reason)

    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/event/${id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    });
    


    const data = await response.json();
    return {
        data: data,
        status: response.status,
    };
}