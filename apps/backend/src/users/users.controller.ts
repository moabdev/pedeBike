import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: UserDto })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const user = await this.userService.create(createUserDto);
    return { ...user, password: undefined }; // Não retornar a senha
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of all users.', type: [UserDto] })
  findAll(): Promise<UserDto[]> {
    return this.userService.findAll().then(users => 
      users.map(user => ({ ...user, password: undefined })) // Não retornar a senha
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by ID' })
  @ApiResponse({ status: 200, description: 'The found user.', type: UserDto })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async findOne(@Param('id') id: number): Promise<UserDto> {
    const user = await this.userService.findOne(id);
    return { ...user, password: undefined }; // Não retornar a senha
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'The user has been successfully updated.', type: UserDto })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.userService.update(id, updateUserDto);
    return { ...user, password: undefined }; // Não retornar a senha
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.', type: UserDto })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async remove(@Param('id') id: number): Promise<UserDto> {
    const user = await this.userService.remove(id);
    return { ...user, password: undefined }; // Não retornar a senha
  }
}
