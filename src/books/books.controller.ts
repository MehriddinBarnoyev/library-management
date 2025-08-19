import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger'; // Add these imports

@ApiTags('books') // Groups under 'books' in Swagger UI
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The book has been successfully created.' })
  @ApiBody({ type: CreateBookDto })
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Retrieve all books.' })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Retrieve a book by ID.' })
  @ApiResponse({ status: 404, description: 'Book not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
  }

  // Similarly update PATCH and DELETE...
}