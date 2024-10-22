import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    type: UserDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.usersService.create(createUserDto);
    return this.mapToDto(user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of users returned.',
    type: [UserDto],
  })
  async findAll(): Promise<UserDto[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => this.mapToDto(user));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User found.', type: UserDto })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.findOne(Number(id));
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.mapToDto(user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully.',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.usersService.update(Number(id), updateUserDto);
    return this.mapToDto(user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a user by ID' })
  @ApiResponse({
    status: 200,
    description: 'User removed successfully.',
    type: UserDto,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async remove(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.remove(Number(id));
    return this.mapToDto(user);
  }

  private mapToDto(user: any): UserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      rentalIds: user.rentals?.map((rental) => rental.id) || [],
      cartId: user.cart?.id || null,
      reservationIds:
        user.reservations?.map((reservation) => reservation.id) || [],
    };
  }
}
