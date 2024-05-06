import * as z from "zod"


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