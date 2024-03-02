import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { DynamoDbModule } from '@/dynamo-db/dynamo-db.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaModule, DynamoDbModule]
})
export class AuthModule { }
