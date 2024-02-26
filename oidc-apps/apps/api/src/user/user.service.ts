import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as argon2 from "argon2";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) { }

    findByEmail(email: string) {
        return this.prismaService.user.findUnique({ where: { email } })
    }

    async register(email: string, password: string) {
        const hash = await argon2.hash(password)
        return await this.prismaService.user.create({ data: { email, password: hash } })
    }
}
