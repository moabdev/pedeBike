import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationDto } from './dto/reservation.dto';

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let service: ReservationsService;

  const mockReservationDto: ReservationDto = {
    id: 1,
    userId: 1,
    bikeId: 1,
    startTime: new Date(),
    endTime: new Date(),
    status: 'PENDING', // ou o valor padrão da sua enum
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockReservationsService = {
    create: jest.fn().mockResolvedValue(mockReservationDto),
    findOne: jest.fn().mockResolvedValue(mockReservationDto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [
        {
          provide: ReservationsService,
          useValue: mockReservationsService,
        },
      ],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      const result = await controller.create(createReservationDto);

      expect(service.create).toHaveBeenCalledWith(createReservationDto);
      expect(result).toEqual(mockReservationDto);
    });
  });

  describe('findOne', () => {
    it('should return a reservation by ID', async () => {
      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockReservationDto);
    });
  });
});
