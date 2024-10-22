import { Test, TestingModule } from '@nestjs/testing';
import { BikeService } from './bikes.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { BikeDto } from './dto/bike.dto';
import { NotFoundException } from '@nestjs/common';

describe('BikeService', () => {
  let service: BikeService;
  let prisma: PrismaService;

  const mockBike = {
    id: 1,
    model: 'Mountain Bike',
    location: 'Park',
    type: 'MOUNTAIN',
    condition: 'NEW',
    pricePerHour: 10.0,
    stock: 5,
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    bike: {
      create: jest.fn().mockResolvedValue(mockBike),
      findMany: jest.fn().mockResolvedValue([mockBike]),
      findUnique: jest.fn().mockResolvedValue(mockBike),
      update: jest.fn().mockResolvedValue(mockBike),
      delete: jest.fn().mockResolvedValue(mockBike),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BikeService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<BikeService>(BikeService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new bike', async () => {
      const createBikeDto: CreateBikeDto = {
        model: 'Mountain Bike',
        location: 'Park',
        type: 'MOUNTAIN',
        condition: 'NEW',
        pricePerHour: 10.0,
        stock: 5,
        isAvailable: true,
      };

      const result = await service.create(createBikeDto);

      expect(prisma.bike.create).toHaveBeenCalledWith({ data: createBikeDto });
      expect(result).toEqual(mockBike);
    });
  });

  describe('findAll', () => {
    it('should return an array of bikes', async () => {
      const result = await service.findAll();
      expect(prisma.bike.findMany).toHaveBeenCalled();
      expect(result).toEqual([mockBike]);
    });
  });

  describe('findOne', () => {
    it('should return a bike by ID', async () => {
      const result = await service.findOne(1);
      expect(prisma.bike.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockBike);
    });

    it('should throw a NotFoundException if bike is not found', async () => {
      jest.spyOn(prisma.bike, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a bike', async () => {
      const updateBikeDto: UpdateBikeDto = { pricePerHour: 15.0 };

      const result = await service.update(1, updateBikeDto);

      expect(prisma.bike.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateBikeDto,
      });
      expect(result).toEqual(mockBike);
    });
  });

  describe('remove', () => {
    it('should remove a bike by ID', async () => {
      const result = await service.remove(1);
      expect(prisma.bike.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockBike);
    });
  });
});
