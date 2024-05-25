"use server";

import * as z from "zod";
import { eventSchema } from "@/schemas/event";


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