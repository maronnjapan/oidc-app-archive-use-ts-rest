import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { Response } from 'express';
import { PrismaTestService } from '../prisma-test/prisma-test.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: PrismaService, useClass: PrismaTestService }]
      // providers: [PrismaService]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    const prisma = module.get(PrismaService)

    const allProperties = Object.keys(prisma);
    const modelNames = allProperties.filter(
      (x) => !(typeof x === "string" && (x.startsWith("$") || x.startsWith("_")))
    );

    for (const model of modelNames) {
      await prisma[model].deleteMany()
    }
  });

  it('should be defined', async () => {
    const res = {} as unknown as Response;
    await controller.login(res);
  });
});
