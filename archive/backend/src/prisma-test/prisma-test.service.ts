import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const {
    DATABASE_TEST_URL
} = process.env

@Injectable()
export class PrismaTestService extends PrismaClient {
    constructor() {
        super({ datasources: { db: { url: DATABASE_TEST_URL } } })
    }
}
