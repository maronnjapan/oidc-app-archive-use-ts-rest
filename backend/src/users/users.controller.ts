import { Controller, Delete, Get, Req, Res, UnauthorizedException } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { Request, Response } from 'express';
import { c } from 'src/contract';
import { Cookies } from 'src/decorator/Cookie';


@Controller()
export class UsersController {

    @TsRestHandler(c.getUserInfo)
    async getLoginUserInfo(@Cookies('sessionToken') session: string) {
        return tsRestHandler(c.getUserInfo, async () => {
            if (!session) {
                throw new UnauthorizedException('invalid_session');
            }
            try {

                return {
                    status: 200,
                    body: { name: 'name', email: 'email' },
                }
            } catch (e) {
                console.log(e)
                throw new UnauthorizedException('invalid_session')
            }
        })

    }

    @Delete(c.deleteUser.path)
    @TsRestHandler(c.deleteUser)
    async deleteUser(@Res({ passthrough: true }) res: Response) {
        return tsRestHandler(c.deleteUser, async () => {
            res.clearCookie('sessionToken')
            return {
                body: null,
                status: 204
            }
        })
    }
}
