import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { generateOpenApi } from '@ts-rest/open-api';
import { contract } from '@repo/ts-rest';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = generateOpenApi(contract, {
    info: {
      title: 'Posts API',
      version: '1.0.0',
    },
  });

  SwaggerModule.setup('api', app, document);
  await app.listen(5000);
}
bootstrap();
