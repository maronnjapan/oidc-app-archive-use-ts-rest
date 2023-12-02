import { BadRequestException, Controller, Req, Res } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { Request, Response } from 'express';
import { c } from 'src/contract';


@Controller()
export class AuthController {

    @TsRestHandler(c.login)
    async login(@Res({ passthrough: true }) response: Response) {
        return tsRestHandler(c.login, async ({ body }) => {
            const expiresIn = 5 * 60 * 1000;
            try {
                const options = {
                    maxAge: expiresIn,
                    httpOnly: true,
                    secure: false
                }

                response.cookie('sessionToken', 'sesstionToken', options);
                return {
                    status: 201,
                    body: undefined,
                }
            } catch (e) {
                throw new BadRequestException('invalid_id_token')
            }
        })
    }

    @TsRestHandler(c.logout)
    async logout(@Res({ passthrough: true }) response: Response, @Req() req: Request) {
        return tsRestHandler(c.logout, async () => {
            const tokenCookie: string = req.cookies?.sessionToken ?? '';
            response.clearCookie('sessionToken')
            return {
                body: null,
                status: 201
            }
        })
    }
}
