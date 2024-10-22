// carts.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from './carts.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartDto } from './dto/cart.dto';

const mockCartDto: CartDto = {
  id: 1,
  userId: 1,
  items: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockPrismaService = {
  cart: {
    create: jest.fn().mockResolvedValue(mockCartDto),
    findUnique: jest.fn(),
  },
};

describe('CartsService', () => {
  let service: CartsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CartsService>(CartsService);
  });

  it('should create a new cart', async () => {
    const createCartDto: CreateCartDto = { userId: 1 };
    const result = await service.create(createCartDto);

    expect(mockPrismaService.cart.create).toHaveBeenCalledWith({
      data: { userId: createCartDto.userId },
    });
    expect(result).toEqual(mockCartDto);
  });

  it('should return a cart by ID', async () => {
    mockPrismaService.cart.findUnique.mockResolvedValue(mockCartDto);

    const result = await service.findOne(1);
    expect(mockPrismaService.cart.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { items: true },
    });
    expect(result).toEqual(mockCartDto);
  });

  it('should throw a NotFoundException if cart is not found', async () => {
    mockPrismaService.cart.findUnique.mockResolvedValue(null); // Simula que o carrinho não foi encontrado

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    await expect(service.findOne(999)).rejects.toThrow('Cart with ID 999 not found');
  });
});
