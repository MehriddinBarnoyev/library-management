import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(CreateUserDto: CreateUserDto) {
        return this.prisma.user.create({
            data: CreateUserDto
        })
    }

    async findAll() {
        return this.prisma.user.findMany()
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({ where: { id } })
        if (!user) throw new NotFoundException(`User with ID ${id} not found`);
        return user
    }

    async findBorrowHistory(id:number){
        const user = await this.findOne(id)
        return this.prisma.borrow.findMany({
            where: { userId: id },
            include: { book: true }
        })
    }
}
