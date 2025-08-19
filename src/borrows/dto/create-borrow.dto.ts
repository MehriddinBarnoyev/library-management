import { IsInt, IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateBorrowDto{
    @ApiProperty({ description: 'The ID of the user borrowing the book', example: 1 })
    @IsInt()
    @IsNotEmpty()
    userId: number;

    @ApiProperty({ description: 'The ID of the book being borrowed', example: 1 })
    @IsInt()
    @IsNotEmpty()
    bookId: number;
}