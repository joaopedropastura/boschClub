import * as z from "zod"

export const loginSchema = z.object({
    email: z.string().email({
        message: "email inválido"
    }),
    password: z.string().min(3, {
        message: "senha inválida"
    }),
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