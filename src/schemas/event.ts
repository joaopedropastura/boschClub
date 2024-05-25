import * as z from "zod"
type Status = "pending" | "approved" | "rejected";


export const eventSchema = z.object({
    name: z.string(),
    date: z.date(),
    placeId: z.string(),
    renterId: z.string(),
    startTime: z.string(),
    endTime: z.string(),
})


export const eventAvailableSchema = z.object({
    date: z.date(),
    placeId: z.string(),
})
