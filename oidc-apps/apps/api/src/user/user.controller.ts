import { c } from '@/contract';
import { Controller, ForbiddenException } from '@nestjs/common';
import { TsRestHandler, tsRestHandler } from '@ts-rest/nest';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {

    }

    @TsRestHandler(c.retister)
    async register() {
        return tsRestHandler(c.retister, async ({ body }) => {
            const user = await this.userService.findByEmail(body.email);
            if (user) {
                throw new ForbiddenException()
            }
            await this.userService.register(body.email, body.password)
            return {
                body: null,
                status: 201
            }
        })
    }
}
