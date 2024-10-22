// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersController } from './users.controller';
// import { UserService } from './users.service';

// describe('UsersController', () => {
//   let controller: UsersController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UsersController],
//       providers: [UserService],
//     }).compile();

//     controller = module.get<UsersController>(UsersController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UserService } from './users.service';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';

const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  password: 'securepassword',
};

const mockUserService = {
  create: jest.fn().mockResolvedValue(mockUser),
  findAll: jest.fn().mockResolvedValue([mockUser]),
  findOne: jest.fn().mockResolvedValue(mockUser),
  update: jest.fn().mockResolvedValue(mockUser),
  remove: jest.fn().mockResolvedValue(mockUser),
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await controller.create(mockUser);
    expect(user).toEqual(mockUser);
    expect(mockUserService.create).toHaveBeenCalledWith(mockUser);
  });

  it('should return all users', async () => {
    const users = await controller.findAll();
    expect(users).toEqual([mockUser]);
    expect(mockUserService.findAll).toHaveBeenCalled();
  });

  it('should return a single user', async () => {
    const user = await controller.findOne('1');
    expect(user).toEqual(mockUser);
    expect(mockUserService.findOne).toHaveBeenCalledWith(1);
  });

  it('should throw NotFoundException if user does not exist', async () => {
    mockUserService.findOne.mockRejectedValueOnce(new NotFoundException('User not found'));
    await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('should update a user', async () => {
    const updatedUser = await controller.update('1', { name: 'Jane Doe' });
    expect(updatedUser).toEqual(mockUser);
    expect(mockUserService.update).toHaveBeenCalledWith(1, { name: 'Jane Doe' });
  });

  it('should delete a user', async () => {
    const deletedUser = await controller.remove('1');
    expect(deletedUser).toEqual(mockUser);
    expect(mockUserService.remove).toHaveBeenCalledWith(1);
  });
});
