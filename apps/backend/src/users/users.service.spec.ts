// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersService } from './users.service';

// describe('UsersService', () => {
//   let service: UsersService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [UsersService],
//     }).compile();

//     service = module.get<UsersService>(UsersService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

import { Users } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'securepassword',
};

const mockPrismaService = {
  users: {
    create: jest.fn().mockResolvedValue(mockUser),
    findMany: jest.fn().mockResolvedValue([mockUser]),
    findUnique: jest.fn().mockResolvedValue(mockUser),
    update: jest.fn().mockResolvedValue(mockUser),
    delete: jest.fn().mockResolvedValue(mockUser),
  },
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await service.create(mockUser);
    expect(user).toEqual(mockUser);
    expect(mockPrismaService.users.create).toHaveBeenCalledWith({ data: mockUser });
  });

  it('should return all users', async () => {
    const users = await service.findAll();
    expect(users).toEqual([mockUser]);
    expect(mockPrismaService.users.findMany).toHaveBeenCalled();
  });

  it('should return a single user', async () => {
    const user = await service.findOne(1);
    expect(user).toEqual(mockUser);
    expect(mockPrismaService.users.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw NotFoundException if user does not exist', async () => {
    mockPrismaService.users.findUnique.mockResolvedValueOnce(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should update a user', async () => {
    const updatedUser = await service.update(1, { name: 'Jane Doe' });
    expect(updatedUser).toEqual(mockUser);
    expect(mockPrismaService.users.update).toHaveBeenCalledWith({ where: { id: 1 }, data: { name: 'Jane Doe' } });
  });

  it('should delete a user', async () => {
    const deletedUser = await service.remove(1);
    expect(deletedUser).toEqual(mockUser);
    expect(mockPrismaService.users.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});
