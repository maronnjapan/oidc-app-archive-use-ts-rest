import { Controller, NotFoundException, Req, Res } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { Request, Response } from 'express';
import { c } from '../contract';
import { AuthService } from './auth.service';
import { AUTHENTICATE_KEY } from '@/utils/Const';
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDbService } from '@/dynamo-db/dynamo-db.service';

@Controller()
export class AuthController {

    constructor(private authService: AuthService, private dynamoService: DynamoDbService) { }

    @TsRestHandler(c.login)
    async login(@Req() req: Request, @Res({ passthrough: true }) res: Response) {

        return tsRestHandler(c.login, async ({ body }) => {
            const user = await this.authService.findLoginUser(body.email, body.password)
            if (!user) {
                throw new NotFoundException()
            }
            res.cookie(AUTHENTICATE_KEY, 'test');
            return {
                status: 201,
                body: null,
            }
        })
    }

    @TsRestHandler(c.saveClientAuthorize)
    async saveClientAuthorize() {
        return tsRestHandler(c.saveClientAuthorize, async ({ body }) => {
            await this.dynamoService.saveClientAuthorize(body, 30);
            return {
                body: null,
                status: 201
            }
        })
    }


}
