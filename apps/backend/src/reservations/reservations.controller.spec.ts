import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from '@prisma/client';
import { ReservationDto } from './dto/reservation.dto'; // Importando o DTO de resposta

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let service: ReservationsService;

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

  const mockReservationsService = {
    create: jest.fn().mockResolvedValue(mockReservation),
    findAll: jest.fn().mockResolvedValue([mockReservation]),
    findOne: jest.fn().mockResolvedValue(mockReservation),
    remove: jest.fn().mockResolvedValue(mockReservation),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [
        { provide: ReservationsService, useValue: mockReservationsService },
      ],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should create a reservation', async () => {
    const createReservationDto: CreateReservationDto = {
      userId: 1,
      bikeId: 1,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      status: 'CONFIRMED', // Altere conforme seu status
    };
    expect(await controller.create(createReservationDto)).toEqual(mockReservation);
  });

  it('should return all reservations', async () => {
    expect(await controller.findAll()).toEqual([mockReservation]);
  });

  it('should return a single reservation', async () => {
    expect(await controller.findOne('1')).toEqual(mockReservation);
  });

  it('should delete a reservation', async () => {
    expect(await controller.remove('1')).toEqual(mockReservation);
  });
});
