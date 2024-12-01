"use server";

import * as z from "zod";
import { eventSchema } from "@/schemas/event";
import { getEventById } from "@/data/event/event";
import { getUserById } from "@/data/user/user";
import { sendEventCanceledEmail } from "@/lib/mail";


export async function DeleteEvent(id : string) {
    
    
    
    
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