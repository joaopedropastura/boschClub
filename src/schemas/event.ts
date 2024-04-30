import * as z from "zod"
type Status = "pending" | "approved" | "rejected";


export const eventSchema = z.object({
    name: z.string(),
    date: z.date(),
    place: z.object({
        name: z.string(),
        maxPeople: z.number(),
    }),
    renter: z.object({
        name: z.string(),
        email: z.string().email(),
    })
})
