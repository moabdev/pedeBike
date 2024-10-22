import { Test, TestingModule } from '@nestjs/testing';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';

describe('CartsController', () => {
  let controller: CartsController;

  const mockCart = {
    id: 1,
    userId: 1,
  };

  const mockCartsService = {
    create: jest.fn().mockResolvedValue(mockCart),
    findAll: jest.fn().mockResolvedValue([mockCart]),
    findOne: jest.fn().mockResolvedValue(mockCart),
    remove: jest.fn().mockResolvedValue(mockCart),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartsController],
      providers: [{ provide: CartsService, useValue: mockCartsService }],
    }).compile();

    controller = module.get<CartsController>(CartsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a cart', async () => {
    const cart = await controller.create({ userId: 1 });
    expect(cart).toEqual(mockCart);
  });

  it('should return all carts', async () => {
    const carts = await controller.findAll();
    expect(carts).toEqual([mockCart]);
  });

  it('should return a cart by ID', async () => {
    const cart = await controller.findOne('1');
    expect(cart).toEqual(mockCart);
  });

  it('should delete a cart', async () => {
    const deletedCart = await controller.remove('1');
    expect(deletedCart).toEqual(mockCart);
  });
});
