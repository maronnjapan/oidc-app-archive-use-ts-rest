import { Controller, NotFoundException, Res } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { Response } from 'express';
import { c } from '../contract';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {

    constructor(private authService: AuthService) { }

    @TsRestHandler(c.login)
    async login(@Res({ passthrough: true }) res: Response) {
        return tsRestHandler(c.login, async ({ body }) => {
            const user = await this.authService.findLoginUser(body.email, body.password)
            if (!user) {
                throw new NotFoundException()
            }
            res.cookie('sessionStore', 'test');
            return {
                status: 201,
                body: null
            }
        })
    }
}
