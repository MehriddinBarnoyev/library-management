import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { BorrowsModule } from './borrows/borrows.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [BooksModule, UsersModule, BorrowsModule],
  providers: [PrismaService],
})
export class AppModule {}