import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        ...createBookDto,
        isAvailable: createBookDto.isAvailable ?? true,
      },
    });
  }

  async findAll() {
    return this.prisma.book.findMany();
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException(`Book with ID ${id} not found`);
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.findOne(id);
    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async remove(id: number) {
     await this.prisma.borrow.deleteMany({
    where: { bookId: id },
  });

  // Keyin kitobni o‘chir
  return this.prisma.book.delete({
    where: { id },
  });
  }
}