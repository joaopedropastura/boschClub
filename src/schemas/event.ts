import * as z from "zod"
type Status = "pending" | "approved" | "rejected";


export const eventSchema = z.object({
    name: z.string(),
    date: z.date(),
    placeId: z.string(),
    renterId: z.string(),
})
