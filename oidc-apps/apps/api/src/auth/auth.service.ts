import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) { }

    async findLoginUser(email: string, password: string) {
        return await this.prismaService.user.findFirst({ where: { email, password } })
    }
}
