import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger'; // Add these imports

@ApiTags('users') // Groups under 'users' in Swagger UI
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post()
    @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
    @ApiBody({ type: CreateUserDto })
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'Retrieve all users.' })
    findAll() {
        return this.usersService.findAll();
    }


    @Get(':id/history')
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Retrieve borrow history for a user.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    findBorrowHistory(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findBorrowHistory(id);
    }
}
