import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'hashedpassword',
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  

  const mockPrismaService = {
    user: {
      create: jest.fn().mockResolvedValue(mockUser),
      findMany: jest.fn().mockResolvedValue([mockUser]),
      findUnique: jest.fn().mockResolvedValue(mockUser),
      update: jest.fn().mockResolvedValue(mockUser),
      delete: jest.fn().mockResolvedValue(mockUser),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const result = await service.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedpassword',
    });
    expect(result).toEqual(mockUser);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
      },
    });
  });

  it('should return all users', async () => {
    const users = await service.findAll();
    expect(users).toEqual([mockUser]);
    expect(prisma.user.findMany).toHaveBeenCalled();
  });

  it('should return a single user', async () => {
    const user = await service.findOne(1);
    expect(user).toEqual(mockUser);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw NotFoundException for non-existent user', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(null);
    await expect(service.findOne(2)).rejects.toThrow(NotFoundException);
  });

  it('should update a user', async () => {
    const updateUserDto = {
      name: 'Updated User',
    };
    const updatedUser = await service.update(1, updateUserDto);
    expect(updatedUser).toEqual(mockUser);
    expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: 1 }, data: updateUserDto });
  });

  it('should throw NotFoundException when updating a non-existent user', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(null);
    await expect(service.update(2, { name: 'Updated User' })).rejects.toThrow(NotFoundException);
  });

  it('should remove a user', async () => {
    const deletedUser = await service.remove(1);
    expect(deletedUser).toEqual(mockUser);
    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw NotFoundException when removing a non-existent user', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValueOnce(null);
    await expect(service.remove(2)).rejects.toThrow(NotFoundException);
  });
});
