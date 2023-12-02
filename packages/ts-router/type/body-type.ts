import { z } from "zod"

export const Login = z.object({
    email: z.string(),
    password: z.string()
});