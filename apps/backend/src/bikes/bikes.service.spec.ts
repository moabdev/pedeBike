// src/bikes/bikes.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { BikesService } from './bikes.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';

// Mock do PrismaService
const mockPrismaService = {
  bikes: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('BikesService', () => {
  let service: BikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BikesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<BikesService>(BikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new bike', async () => {
      const createBikeDto: CreateBikeDto = {
        model: 'Mountain Bike',
        location: 'Store 1',
        type: 'MOUNTAIN',
        condition: 'NEW',
        pricePerHour: 15.0,
        stock: 10,
      };

      mockPrismaService.bikes.create.mockResolvedValue(createBikeDto);

      const result = await service.create(createBikeDto);
      expect(result).toEqual(createBikeDto);
      expect(mockPrismaService.bikes.create).toHaveBeenCalledWith({ data: createBikeDto });
    });
  });

  describe('findAll', () => {
    it('should return an array of bikes', async () => {
      const result = [
        {
          id: 1,
          model: 'Mountain Bike',
          location: 'Store 1',
          type: 'MOUNTAIN',
          condition: 'NEW',
          pricePerHour: 15.0,
          stock: 10,
        },
      ];

      mockPrismaService.bikes.findMany.mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a bike', async () => {
      const result = {
        id: 1,
        model: 'Mountain Bike',
        location: 'Store 1',
        type: 'MOUNTAIN',
        condition: 'NEW',
        pricePerHour: 15.0,
        stock: 10,
      };

      mockPrismaService.bikes.findUnique.mockResolvedValue(result);

      expect(await service.findOne(1)).toBe(result);
    });

    it('should throw a NotFoundException if bike does not exist', async () => {
      mockPrismaService.bikes.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrowError('Bike with ID 1 not found');
    });
  });

  describe('update', () => {
    it('should update a bike', async () => {
      const updateBikeDto: UpdateBikeDto = {
        model: 'New Model',
      };

      const updatedBike = { ...updateBikeDto, id: 1 };

      mockPrismaService.bikes.update.mockResolvedValue(updatedBike);

      expect(await service.update(1, updateBikeDto)).toEqual(updatedBike);
      expect(mockPrismaService.bikes.update).toHaveBeenCalledWith({ where: { id: 1 }, data: updateBikeDto });
    });

    it('should throw a NotFoundException if bike does not exist', async () => {
      const updateBikeDto: UpdateBikeDto = {
        model: 'New Model',
      };

      mockPrismaService.bikes.findUnique.mockResolvedValue(null);

      await expect(service.update(1, updateBikeDto)).rejects.toThrowError('Bike with ID 1 not found');
    });
  });

  describe('remove', () => {
    it('should remove a bike', async () => {
      const bike = {
        id: 1,
        model: 'Mountain Bike',
      };

      mockPrismaService.bikes.findUnique.mockResolvedValue(bike);
      mockPrismaService.bikes.delete.mockResolvedValue(bike);

      expect(await service.remove(1)).toBe(bike);
    });

    it('should throw a NotFoundException if bike does not exist', async () => {
      mockPrismaService.bikes.findUnique.mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrowError('Bike with ID 1 not found');
    });
  });
});
