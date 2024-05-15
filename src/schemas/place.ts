
import * as z from "zod"

export const registerPlaceSchema = z.object({
    name: z.string(),
    maxCapacity: z.number(),    
    type: z.string(),

})