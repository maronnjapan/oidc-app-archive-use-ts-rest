import z from "zod";

export const loginSchem = z.object({
    email: z.string().min(1),
    password: z.string().min(1)
})

export const registerSchem = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(1)
})