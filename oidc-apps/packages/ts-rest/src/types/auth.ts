import z from "zod";

export const loginSchem = z.object({
    email: z.string().min(1),
    password: z.string().min(1)
})

export const registerSchem = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(1)
})

export const saveClientAuthorizeSchema = z.object({
    client_id: z.string(),
    scope: z.string(),
    response_type: z.enum(['code']),
    redirect_uri: z.string(),
    audience: z.string().nullable(),
    prompt: z.string().nullable(),
    state: z.string(),
    code_challenge: z.string(),
    code_challenge_method: z.enum(['S256', 'plain'])
})