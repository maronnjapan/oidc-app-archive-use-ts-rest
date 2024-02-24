import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { defineUserFactory } from './__generated__/fabbrica';

describe('AppController', () => {
  let appController: AppController;
  const userFactory = defineUserFactory()

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports: [PrismaModule]
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const user = await userFactory.create();
      const res = appController.getHello();
      const resulet = await res({ headers: {}, query: { q: 'test' } })
      expect(resulet['body']['body']).toEqual(user.email)
    });
  });
});
