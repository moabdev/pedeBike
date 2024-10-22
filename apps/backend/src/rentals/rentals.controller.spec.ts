import { Test, TestingModule } from '@nestjs/testing';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { RentalDto } from './dto/rental.dto';

describe('RentalsController', () => {
  let controller: RentalsController;
  let service: RentalsService;

  const mockRentalDto: RentalDto = {
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

  const mockRentalsService = {
    create: jest.fn().mockResolvedValue(mockRentalDto),
    findOne: jest.fn().mockResolvedValue(mockRentalDto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalsController],
      providers: [
        {
          provide: RentalsService,
          useValue: mockRentalsService,
        },
      ],
    }).compile();

    controller = module.get<RentalsController>(RentalsController);
    service = module.get<RentalsService>(RentalsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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

      const result = await controller.create(createRentalDto);

      expect(service.create).toHaveBeenCalledWith(createRentalDto);
      expect(result).toEqual(mockRentalDto);
    });
  });

  describe('findOne', () => {
    it('should return a rental by ID', async () => {
      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockRentalDto);
    });
  });
});
