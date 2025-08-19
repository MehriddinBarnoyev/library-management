import { IsString, IsInt, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; 

export class CreateBookDto {
  @ApiProperty({ description: 'The title of the book', example: 'The Hobbit' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'The author of the book', example: 'J.R.R. Tolkien' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ description: 'The year the book was published', example: 1937 })
  @IsInt()
  publishedYear: number;

  @ApiProperty({ description: 'The genre of the book', example: 'Fantasy' })
  @IsString()
  @IsNotEmpty()
  genre: string;

  @ApiProperty({ description: 'Availability status of the book', example: true, required: false })
  @IsBoolean()
  isAvailable?: boolean;
}