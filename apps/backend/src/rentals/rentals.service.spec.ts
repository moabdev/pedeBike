import { Test, TestingModule } from '@nestjs/testing';
import { RentalsService } from './rentals.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateRentalDto } from './dto/create-rental.dto';
import { Rental } from '@prisma/client';

describe('RentalsService', () => {
  let service: RentalsService;
  let prismaService: PrismaService;

  const mockRental: Rental = {
    id: 1,
    userId: 1,
    bikeId: 1,
    startTime: new Date(),
    endTime: null,
    totalPrice: 100,
    status: 'ONGOING',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    rental: {
      create: jest.fn().mockResolvedValue(mockRental),
      findMany: jest.fn().mockResolvedValue([mockRental]),
      findUnique: jest.fn().mockResolvedValue(mockRental),
      delete: jest.fn().mockResolvedValue(mockRental),
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

  it('should create a rental', async () => {
    const createRentalDto: CreateRentalDto = {
      userId: 1,
      bikeId: 1,
      startTime: new Date(),
      endTime: null,
      totalPrice: 100,
      status: 'ONGOING',
    };
    expect(await service.create(createRentalDto)).toEqual(mockRental);
  });

  it('should return all rentals', async () => {
    expect(await service.findAll()).toEqual([mockRental]);
  });

  it('should return a single rental', async () => {
    expect(await service.findOne(1)).toEqual(mockRental);
  });

  it('should throw NotFoundException for non-existing rental', async () => {
    jest.spyOn(prismaService.rental, 'findUnique').mockResolvedValue(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should delete a rental', async () => {
    expect(await service.remove(1)).toEqual(mockRental);
  });
});
