import { Test, TestingModule } from '@nestjs/testing';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { RentalDto } from './dto/rental.dto'; // Importando o DTO
import { Rental } from '@prisma/client';

describe('RentalsController', () => {
  let controller: RentalsController;
  let service: RentalsService;

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

  const mockRentalsService = {
    create: jest.fn().mockResolvedValue(mockRental),
    findAll: jest.fn().mockResolvedValue([mockRental]),
    findOne: jest.fn().mockResolvedValue(mockRental),
    remove: jest.fn().mockResolvedValue(mockRental),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentalsController],
      providers: [
        { provide: RentalsService, useValue: mockRentalsService },
      ],
    }).compile();

    controller = module.get<RentalsController>(RentalsController);
    service = module.get<RentalsService>(RentalsService);
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
    expect(await controller.create(createRentalDto)).toEqual(mockRental);
  });

  it('should return all rentals', async () => {
    expect(await controller.findAll()).toEqual([mockRental]);
  });

  it('should return a single rental', async () => {
    expect(await controller.findOne('1')).toEqual(mockRental);
  });

  it('should delete a rental', async () => {
    expect(await controller.remove('1')).toEqual(mockRental);
  });
});
