import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from '@prisma/client';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    role: 'USER',
    email: 'john@example.com',
    password: 'hashed_password', // não deve ser exposto
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUserService = {
    create: jest.fn().mockResolvedValue(mockUser),
    findAll: jest.fn().mockResolvedValue([mockUser]),
    findOne: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
    remove: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    };
    const result: UserDto = await controller.create(createUserDto);
    expect(result).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
    });
    expect(service.create).toHaveBeenCalledWith(createUserDto);
  });

  it('should return all users', async () => {
    const result: UserDto[] = await controller.findAll();
    expect(result).toEqual([{
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
    }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single user', async () => {
    const result: UserDto = await controller.findOne(1);
    expect(result).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
    });
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should update a user', async () => {
    const updateUserDto: UpdateUserDto = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      // Adicione outros campos conforme necessário
    };
    const result: UserDto = await controller.update(1, updateUserDto);
    expect(result).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
    });
    expect(service.update).toHaveBeenCalledWith(1, updateUserDto);
  });

  it('should remove a user', async () => {
    const result: UserDto = await controller.remove(1);
    expect(result).toEqual({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
    });
    expect(service.remove).toHaveBeenCalledWith(1);
  });
});
