import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from './carts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('CartsService', () => {
  let service: CartsService;

  const mockCart = {
    id: 1,
    userId: 1,
  };

  const mockPrismaService = {
    carts: {
      create: jest.fn().mockResolvedValue(mockCart),
      findMany: jest.fn().mockResolvedValue([mockCart]),
      findUnique: jest.fn().mockResolvedValue(mockCart),
      delete: jest.fn().mockResolvedValue(mockCart),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CartsService>(CartsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a cart', async () => {
    const cart = await service.create({ userId: 1 });
    expect(cart).toEqual(mockCart);
  });

  it('should find all carts', async () => {
    const carts = await service.findAll();
    expect(carts).toEqual([mockCart]);
  });

  it('should find one cart by ID', async () => {
    const cart = await service.findOne(1);
    expect(cart).toEqual(mockCart);
  });

  it('should throw NotFoundException if cart not found', async () => {
    const mockPrismaServiceWithNotFound = {
      carts: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
    };

    const serviceWithNotFound = new CartsService(mockPrismaServiceWithNotFound as any);

    await expect(serviceWithNotFound.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should delete a cart', async () => {
    const deletedCart = await service.remove(1);
    expect(deletedCart).toEqual(mockCart);
  });
});
