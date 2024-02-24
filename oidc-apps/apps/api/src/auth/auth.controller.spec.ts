import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from './auth.service';
import { defineUserFactory } from '../__generated__/fabbrica';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { c } from '../contract';
import { PrismaService } from '@/prisma/prisma.service';
import { noop } from 'rxjs';

describe('AuthController', () => {
  let controller: AuthController;
  let app: INestApplication;
  let prisma: PrismaService;

  const userFactory = defineUserFactory()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
      imports: [PrismaModule]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    prisma = module.get(PrismaService)

    app = module.createNestApplication()
    await app.init()
  });

  afterEach(async () => {
    await prisma.$disconnect()
  })

  describe('login', () => {
    it('ユーザーが存在する場合はCookieに認証情報を保存すること', async () => {
      const user = await userFactory.create();
      const data: typeof c.login.body._input = { email: user.email, password: user.password }

      const res = await request(app.getHttpServer())
        .post(c.login.path)
        .send(data)


      expect(res.status).toEqual(201);

      expect(res.headers['set-cookie']).toHaveLength(1)
      expect(res.headers['set-cookie'][0]).toContain('sessionStore=')

    })
    it('一致するユーザーが存在しない場合は404エラーを返すこと', async () => {
      const data: typeof c.login.body._input = { email: 'no@example.com', password: 'notExistPassword' }

      const res = await request(app.getHttpServer())
        .post(c.login.path)
        .send(data)

      expect(res.status).toEqual(404);

      expect(res.headers['set-cookie']).toBeUndefined()
    })
  })
});
