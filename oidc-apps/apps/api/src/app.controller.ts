import { Controller } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { c } from './contract';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) { }

  @TsRestHandler(c.getPost)
  getHello() {
    return tsRestHandler(c.getPost, async () => {
      const user = await this.prismaService.user.findFirst({});
      return {
        status: 200,
        body: { title: 'タイトル', id: 'id', body: user?.email ?? 'test' }
      }
    })
  }
}
