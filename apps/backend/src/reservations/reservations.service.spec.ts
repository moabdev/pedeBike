import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from '@prisma/client';

describe('ReservationsService', () => {
  let service: ReservationsService;
  let prismaService: PrismaService;

  const mockReservation: Reservation = {
    id: 1,
    userId: 1,
    bikeId: 1,
    startTime: new Date(),
    endTime: new Date(),
    status: 'CONFIRMED', // Altere conforme seu status
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    reservation: {
      create: jest.fn().mockResolvedValue(mockReservation),
      findMany: jest.fn().mockResolvedValue([mockReservation]),
      findUnique: jest.fn().mockResolvedValue(mockReservation),
      delete: jest.fn().mockResolvedValue(mockReservation),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should create a reservation', async () => {
    const createReservationDto: CreateReservationDto = {
      userId: 1,
      bikeId: 1,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      status: 'PENDING', // Altere conforme seu status
    };
    expect(await service.create(createReservationDto)).toEqual(mockReservation);
  });

  it('should return all reservations', async () => {
    expect(await service.findAll()).toEqual([mockReservation]);
  });

  it('should return a single reservation', async () => {
    expect(await service.findOne(1)).toEqual(mockReservation);
  });

  it('should throw NotFoundException for non-existing reservation', async () => {
    jest.spyOn(prismaService.reservation, 'findUnique').mockResolvedValue(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should delete a reservation', async () => {
    expect(await service.remove(1)).toEqual(mockReservation);
  });
});
