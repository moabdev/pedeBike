import { Test, TestingModule } from '@nestjs/testing';
import { BikesService } from './bikes.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { Bike } from '@prisma/client';

describe('BikesService', () => {
  let service: BikesService;
  let prisma: PrismaService;

  const mockBike: Bike = {
    id: 1,
    model: 'Mountain Bike',
    location: 'Park',
    type: 'MOUNTAIN',
    condition: 'NEW',
    pricePerHour: 15.5,
    stock: 10,
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BikesService,
        {
          provide: PrismaService,
          useValue: {
            bike: {
              create: jest.fn().mockResolvedValue(mockBike),
              findMany: jest.fn().mockResolvedValue([mockBike]),
              findUnique: jest.fn().mockResolvedValue(mockBike),
              update: jest.fn().mockResolvedValue(mockBike),
              delete: jest.fn().mockResolvedValue(mockBike),
            },
          },
        },
      ],
    }).compile();

    service = module.get<BikesService>(BikesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a bike', async () => {
      const createBikeDto: CreateBikeDto = {
        model: 'Mountain Bike',
        location: 'Park',
        type: 'MOUNTAIN',
        condition: 'NEW',
        pricePerHour: 15.5,
        stock: 10,
        isAvailable: true,
      };
      expect(await service.create(createBikeDto)).toEqual(mockBike);
    });
  });

  describe('findAll', () => {
    it('should return an array of bikes', async () => {
      const bikes = await service.findAll();
      expect(bikes).toEqual([mockBike]);
    });
  });

  describe('findOne', () => {
    it('should return a bike', async () => {
      const bike = await service.findOne(1);
      expect(bike).toEqual(mockBike);
    });

    it('should throw an error if bike not found', async () => {
      prisma.bike.findUnique = jest.fn().mockResolvedValue(null);
      await expect(service.findOne(2)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update a bike', async () => {
      const updateBikeDto: Partial<CreateBikeDto> = {
        model: 'Updated Bike',
      };
      prisma.bike.update = jest.fn().mockResolvedValue({
        ...mockBike,
        ...updateBikeDto,
      });
      const bike = await service.update(1, updateBikeDto);
      expect(bike.model).toEqual('Updated Bike');
    });
  });

  describe('remove', () => {
    it('should remove a bike', async () => {
      const bike = await service.remove(1);
      expect(bike).toEqual(mockBike);
    });

    it('should throw an error if bike not found', async () => {
      prisma.bike.findUnique = jest.fn().mockResolvedValue(null);
      await expect(service.remove(2)).rejects.toThrow();
    });
  });
});
