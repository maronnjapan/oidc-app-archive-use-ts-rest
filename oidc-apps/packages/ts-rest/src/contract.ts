// contract.ts

import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { loginSchem, registerSchem, saveClientAuthorizeSchema } from './types/auth';

const c = initContract();

const PostSchema = z.object({
    id: z.string(),
    title: z.string(),
    body: z.string()
});

export const contract = c.router({
    login: {
        method: 'POST',
        path: '/auth/login',
        body: loginSchem,
        responses: { 201: null },
        description: 'ログイン処理を行うAPI'
    },
    saveClientAuthorize: {
        method: 'POST',
        path: '/auth/client-authorize/save',
        body: saveClientAuthorizeSchema,
        responses: { 201: z.string() },
        description: 'クライアントから/authorizeにリダイレクトされたときのクエリ情報を保存する'
    },
    retister: {
        method: 'POST',
        path: '/users/register',
        body: registerSchem,
        responses: { 201: null },
        description: 'ユーザー情報登録API'
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