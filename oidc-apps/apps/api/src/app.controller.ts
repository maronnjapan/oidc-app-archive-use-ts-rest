import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { c } from './contract';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @TsRestHandler(c.getPost)
  getHello() {
    return tsRestHandler(c.getPost, async () => {
      return {
        status: 200,
        body: { title: 'タイトル', id: 'id', body: 'test2' }
      }
    })
  }
}
