import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { c } from './contract';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) { }

  @Get(c.hello.path)
  @TsRestHandler(c.hello)
  async getHello() {
    return tsRestHandler(c.hello, async () => {
      return {
        status: 200,
        body: { name: 'Hello' }
      }
    })
  }

  @Get('/user/test')
  async getUsers() {
    return await this.prismaService.user.findMany()
  }
}
