import { Test, TestingModule } from '@nestjs/testing';
import { CartItemsService } from './cart-items.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('CartItemsService', () => {
  let service: CartItemsService;

  const mockCartItem = {
    id: 1,
    cartId: 1,
    bikeId: 1,
    quantity: 1,
    hours: 2,
  };

  const mockPrismaService = {
    cartItems: {
      create: jest.fn().mockResolvedValue(mockCartItem),
      findMany: jest.fn().mockResolvedValue([mockCartItem]),
      findUnique: jest.fn().mockResolvedValue(mockCartItem),
      delete: jest.fn().mockResolvedValue(mockCartItem),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartItemsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CartItemsService>(CartItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a cart item', async () => {
    const cartItem = await service.create({ cartId: 1, bikeId: 1, quantity: 1, hours: 2 });
    expect(cartItem).toEqual(mockCartItem);
  });

  it('should find all cart items', async () => {
    const cartItems = await service.findAll();
    expect(cartItems).toEqual([mockCartItem]);
  });

  it('should find one cart item by ID', async () => {
    const cartItem = await service.findOne(1);
    expect(cartItem).toEqual(mockCartItem);
  });

  it('should throw NotFoundException if cart item not found', async () => {
    const mockPrismaServiceWithNotFound = {
      cartItems: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
    };

    const serviceWithNotFound = new CartItemsService(mockPrismaServiceWithNotFound as any);

    await expect(serviceWithNotFound.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should delete a cart item', async () => {
    const deletedCartItem = await service.remove(1);
    expect(deletedCartItem).toEqual(mockCartItem);
  });
});
