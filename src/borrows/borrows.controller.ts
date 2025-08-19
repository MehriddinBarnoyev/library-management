import { Body, Controller, Get, Post } from '@nestjs/common';
import { BorrowsService } from './borrows.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { ReturnBookDto } from './dto/return-book.dto';
import { ApiTags, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger'; // Add these imports

@ApiTags('borrows') // Groups under 'borrows' in Swagger UI
@Controller('borrows')
export class BorrowsController {
    constructor(private readonly borrowsService: BorrowsService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'The book has been successfully borrowed.' })
    borrowBook(@Body() createBorrowDto: CreateBorrowDto) {
        return this.borrowsService.borrowBook(createBorrowDto);
    }

    @Post('/return')
    @ApiResponse({ status: 200, description: 'The book has been successfully returned.' })
    returnBook(@Body() returnBookDto: ReturnBookDto) {
        return this.borrowsService.returnBook(returnBookDto);
    }

    @Get('/borrowed')
    @ApiResponse({ status: 200, description: 'Retrieve all borrowed books.' })
    findBorrowedBooks() {
        return this.borrowsService.findBorrowedBooks();
    }
}
