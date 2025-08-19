import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { ReturnBookDto } from './dto/return-book.dto';

@Injectable()
export class BorrowsService {
  private readonly logger = new Logger(BorrowsService.name);

  constructor(private prisma: PrismaService) {}

  async borrowBook(createBorrowDto: CreateBorrowDto) {
    const { userId, bookId } = createBorrowDto;
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    const book = await this.prisma.book.findUnique({ where: { id: bookId } });
    if (!book) throw new NotFoundException(`Book with ID ${bookId} not found`);
    if (!book.isAvailable) throw new NotFoundException(`Book with ID ${bookId} is not available`);
    const borrow = await this.prisma.borrow.create({
      data: {
        userId,
        bookId,
        borrowDate: new Date(),
      },
    });

    await this.prisma.book.update({
      where: { id: bookId },
      data: { isAvailable: false },
    });

    this.logger.log(`Book ID ${bookId} borrowed by User ID ${userId}`);
    return borrow;
  }

  async returnBook(returnBookDto: ReturnBookDto) {
    const { borrowId } = returnBookDto;

    const borrow = await this.prisma.borrow.findUnique({ where: { id: borrowId } });
    if (!borrow) throw new NotFoundException(`Borrow record with ID ${borrowId} not found`);
    if (borrow.returnDate) throw new NotFoundException(`Book already returned`);

    const updatedBorrow = await this.prisma.borrow.update({
      where: { id: borrowId },
      data: { returnDate: new Date() },
    });

    await this.prisma.book.update({
      where: { id: borrow.bookId },
      data: { isAvailable: true },
    });

    this.logger.log(`Book ID ${borrow.bookId} returned for Borrow ID ${borrowId}`);
    return updatedBorrow;
  }

  async findBorrowedBooks() {
    return this.prisma.borrow.findMany({
      where: { returnDate: null },
      include: { book: true, user: true },
    });
  }
}