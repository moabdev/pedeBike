import { Test, TestingModule } from '@nestjs/testing';
import { RentalsService } from './rentals.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { RentalDto } from './dto/rental.dto';
import { Rental } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

describe('RentalsService', () => {
  let service: RentalsService;
  let prismaService: PrismaService;

  const mockRental: Rental = {
    id: 1,
    userId: 1,
    bikeId: 1,
    startTime: new Date(),
    endTime: new Date(),
    totalPrice: 100.0,
    status: 'ONGOING',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    rental: {
      create: jest.fn().mockResolvedValue(mockRental),
      findUnique: jest.fn().mockResolvedValue(mockRental),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentalsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<RentalsService>(RentalsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a rental', async () => {
      const createRentalDto: CreateRentalDto = {
        userId: 1,
        bikeId: 1,
        startTime: new Date(),
        endTime: new Date(),
        totalPrice: 100.0,
        status: 'ONGOING',
      };

      const result: RentalDto = await service.create(createRentalDto);

      expect(prismaService.rental.create).toHaveBeenCalledWith({
        data: createRentalDto,
      });
      expect(result).toEqual(mockRental);
    });
  });

  describe('findOne', () => {
    it('should return a rental by ID', async () => {
      const result = await service.findOne(1);
      expect(prismaService.rental.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockRental);
    });

    it('should throw a NotFoundException if rental not found', async () => {
      jest.spyOn(prismaService.rental, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
