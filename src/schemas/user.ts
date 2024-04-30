import * as z from "zod"


export const userSchema = z.object({
    name: z.string(),
    email: z.string().email(), 
    provider: z.string(),
    edv: z.string().min(8)
})