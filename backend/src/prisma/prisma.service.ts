import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const {
    DATABASE_URL
} = process.env

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({ datasources: { db: { url: DATABASE_URL } } })
    }
}
