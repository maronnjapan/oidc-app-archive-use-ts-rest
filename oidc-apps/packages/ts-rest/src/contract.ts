// contract.ts

import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { loginSchem } from './types/auth';

const c = initContract();

const PostSchema = z.object({
    id: z.string(),
    title: z.string(),
    body: z.string()
});

export const contract = c.router({
    login: {
        method: 'POST',
        path: '/login',
        body: loginSchem,
        responses: { 201: null },
        description: 'ログイン処理を行うAPI'
    },
    getPost: {
        method: 'GET',
        path: `/post`,
        query: z.object({
            q: z.string()
        }),
        responses: {
            200: PostSchema.nullable(),
        },
        summary: 'Get a post by id',
    },
});