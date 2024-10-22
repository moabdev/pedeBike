import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from './carts.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartDto } from './dto/cart.dto';
import { NotFoundException } from '@nestjs/common';
import { Cart, CartItem } from '@prisma/client';

interface CartWithItems extends Cart {
  items: CartItem[];
}

describe('CartsService', () => {
  let service: CartsService;
  let prisma: PrismaService;

  const mockCart: CartWithItems = {
    id: 1,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    items: [],
  };

  const mockCartDto: CartDto = {
    id: 1,
    userId: 1,
    items: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    cart: {
      create: jest.fn().mockResolvedValue(mockCart),
      findUnique: jest.fn().mockResolvedValue(mockCart),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CartsService>(CartsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new cart', async () => {
      const createCartDto: CreateCartDto = { userId: 1 };
      const result = await service.create(createCartDto);

      expect(prisma.cart.create).toHaveBeenCalledWith({
        data: {
          userId: createCartDto.userId,
        },
      });
      expect(result).toEqual(mockCartDto);
    });
  });

  describe('findOne', () => {
    it('should return a cart by ID', async () => {
      const result = await service.findOne(1);

      expect(prisma.cart.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { items: true },
      });
      expect(result).toEqual(mockCartDto);
    });

    it('should throw a NotFoundException if cart is not found', async () => {
      jest.spyOn(prisma.cart, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
      await expect(service.findOne(999)).rejects.toThrow('Cart with ID 999 not found');
    });
  });
});
