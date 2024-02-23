import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { PrismaService } from './prisma/prisma.service';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [PrismaService],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    it('ユーザーを取得できること', async () => {
        const result = await appController.getHello();
        const res = await result({ headers: {} });
        expect(result).toHaveLength(1)
    })
});
