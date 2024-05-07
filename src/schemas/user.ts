import * as z from "zod"

export const settingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
}) 
    .refine((data) => {
        if (data.password && !data.newPassword) {
            return false
        } 
        return true
    }, {
        message: "A nova senha é obrigatória",
        path: ["newPassword"]
     
    })
    .refine((data) => {
        if (data.newPassword &&  !data.password) {
            return false
        } 
        return true
    }, {
        message: "A senha atual  é obrigatória",
        path: ["password"]
     
    })

export const userSchema = z.object({
    name: z.string(),
    email: z.string().email(), 
    provider: z.string(),
    edv: z.string().min(8)
})

export const resetSchema = z.object({
    email: z.string().email({
        message: "email inválido"
    }),
})

export const newPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "a senha deve conter no mínimo 6 caracteres"
    })
})

export const loginSchema = z.object({
    email: z.string().email({
        message: "email inválido"
    }),
    password: z.string().min(3, {
        message: "senha inválida"
    }),
    code: z.optional(z.string())
})

export const registerSchema = z.object({
    email: z.string().email({
        message: "email inválido"
    }),
    password: z.string().min(6, {
        message: "a senha deve conter no mínimo 6 caracteres"
    }),
    name: z.string(),
    edv: z.string().min(3, {
        message: "username inválido"
    })

})