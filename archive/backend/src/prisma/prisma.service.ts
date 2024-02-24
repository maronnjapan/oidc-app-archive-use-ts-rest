import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        if (process.argv.some((arg) => arg.includes('.spec.ts'))) {
            throw new Error('Can Not Use This Class In Test File')
        }
        console.log(process.env.DATABASE_URL, 'コンストラクタ')
        super()
    }
}
