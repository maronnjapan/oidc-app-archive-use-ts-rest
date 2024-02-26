import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { defineUserFactory } from '@/__generated__/fabbrica';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from './user.service';
import { ForbiddenException } from '@nestjs/common';
import * as argon2 from "argon2";


describe('UserController', () => {
  let controller: UserController;
  let prisma: PrismaService;
  const userFactory = defineUserFactory()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    controller = module.get<UserController>(UserController);
    prisma = module.get(PrismaService)
  });

  afterEach(async () => {
    await prisma.$disconnect()
  })

  describe('register', () => {
    it('一致するメールアドレスが存在しない場合、メールアドレスとパスワードは保存できること', async () => {
      jest.spyOn(argon2, 'hash').mockImplementation(async (pass) => pass.toString())
      const res = await controller.register()
      await res({ body: { email: 'test@example.com', password: 'password' }, headers: {} })
      const user = await prisma.user.findFirst({ where: { email: 'test@example.com', password: 'password' } });
      expect(user).not.toBeNull()
      expect(argon2.hash).toHaveBeenCalled()
    })
    it('一致するメールアドレスが存在する場合、403エラーを返すこと', async () => {
      const user = await userFactory.create()
      const res = await controller.register()
      return expect(res({ body: { email: user.email, password: user.password }, headers: {} })).rejects.toThrow(ForbiddenException)
    })
  })
});
