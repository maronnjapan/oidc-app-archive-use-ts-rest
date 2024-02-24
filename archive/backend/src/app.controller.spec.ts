import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';
import { c } from './contract';
import * as z from 'zod';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [PrismaService],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    it('値が取得できること', async () => {
        const result = await appController.getHello();
        const data = await result({ headers: {} })
        expect(data.body).toEqual({ name: 'Hello' })
        const responseBody = data.body;
        expect(responseBody['name']).toEqual('Hello')
        // or
        // expect(responseBody).toEqual(checkVal)
    })
});
