import { Test, TestingModule } from '@nestjs/testing';
import { RentalsService } from './rentals.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('RentalsService', () => {
  let service: RentalsService;

  const mockRental = {
    id: 1,
    userId: 1,
    bikeId: 1,
    startTime: new Date(),
    endTime: null,
    totalPrice: 0,
    status: 'ONGOING',
  };

  const mockPrismaService = {
    rentals: {
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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a rental', async () => {
    const rental = await service.create({ userId: 1, bikeId: 1, startTime: new Date(), status: 'ONGOING' });
    expect(rental).toEqual(mockRental);
  });

  it('should find all rentals', async () => {
    const rentals = await service.findAll();
    expect(rentals).toEqual([mockRental]);
  });

  it('should find one rental by ID', async () => {
    const rental = await service.findOne(1);
    expect(rental).toEqual(mockRental);
  });

  it('should throw NotFoundException if rental not found', async () => {
    const mockPrismaServiceWithNotFound = {
      rentals: {
        findUnique: jest.fn().mockResolvedValue(null),
      },
    };

    const serviceWithNotFound = new RentalsService(mockPrismaServiceWithNotFound as any);

    await expect(serviceWithNotFound.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should delete a rental', async () => {
    const deletedRental = await service.remove(1);
    expect(deletedRental).toEqual(mockRental);
  });
});
