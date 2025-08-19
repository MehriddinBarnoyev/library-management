import { IsString, IsEmail, IsNotEmpty, isString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto{
    @ApiProperty({ description: 'The name of the user', example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    name:string

    @ApiProperty({ description: 'The email of the user', example: 'john.doe@example.com' })
    @IsEmail()
    email:string
}