import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationDto } from './dto/reservation.dto';
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
    status: 'PENDING', // ou o valor padrão da sua enum
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    reservation: {
      create: jest.fn().mockResolvedValue(mockReservation),
      findUnique: jest.fn().mockResolvedValue(mockReservation),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a reservation', async () => {
      const createReservationDto: CreateReservationDto = {
        userId: 1,
        bikeId: 1,
        startTime: new Date(),
        endTime: new Date(),
        status: 'PENDING', // ou o valor padrão da sua enum
      };

      const result = await service.create(createReservationDto);

      expect(prismaService.reservation.create).toHaveBeenCalledWith({ data: createReservationDto });
      expect(result).toEqual({
        ...mockReservation,
        createdAt: mockReservation.createdAt,
        updatedAt: mockReservation.updatedAt,
      });
    });
  });

  describe('findOne', () => {
    it('should return a reservation by ID', async () => {
      const result = await service.findOne(1);

      expect(prismaService.reservation.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual({
        ...mockReservation,
        createdAt: mockReservation.createdAt,
        updatedAt: mockReservation.updatedAt,
      });
    });

    it('should throw a NotFoundException if reservation not found', async () => {
      jest.spyOn(prismaService.reservation, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
