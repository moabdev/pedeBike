import { Test, TestingModule } from '@nestjs/testing';
import { CartItemsService } from './cart-items.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CartItem } from '@prisma/client';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItemDto } from './dto/cart-item.dto';

describe('CartItemsService', () => {
  let service: CartItemsService;
  let prismaService: PrismaService;

  const mockCartItem: CartItem = {
    id: 1,
    cartId: 1,
    bikeId: 101,
    quantity: 2,
    hours: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    cartItem: {
      create: jest.fn().mockResolvedValue(mockCartItem),
      findUnique: jest.fn().mockResolvedValue(mockCartItem),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartItemsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CartItemsService>(CartItemsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new cart item', async () => {
      const createCartItemDto: CreateCartItemDto = { cartId: 1, bikeId: 101, quantity: 2, hours: 1 };
      const result = await service.create(createCartItemDto);

      expect(prismaService.cartItem.create).toHaveBeenCalledWith({
        data: createCartItemDto,
      });
      expect(result).toEqual({
        id: expect.any(Number),
        cartId: 1,
        bikeId: 101,
        quantity: 2,
        hours: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe('findOne', () => {
    it('should return a single cart item by ID', async () => {
      const result = await service.findOne(1);

      expect(prismaService.cartItem.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual({
        id: expect.any(Number),
        cartId: 1,
        bikeId: 101,
        quantity: 2,
        hours: 1,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('should throw a NotFoundException if cart item is not found', async () => {
      jest.spyOn(prismaService.cartItem, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow('Cart item with ID 999 not found');
    });
  });
});
