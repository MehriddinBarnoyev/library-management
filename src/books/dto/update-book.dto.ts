import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    @ApiProperty({description: 'The title of the book', example: 'The Hobbit', required: false})
    @IsString()
    title?: string;

    @ApiProperty({description: 'The author of the book', example: 'J.R.R. Tolkien', required: false})
    @IsString()
    author?: string;

    @ApiProperty({description: 'The genre of the book', example: 'Fantasy', required: false})
    @IsString()
    genre?: string;
}