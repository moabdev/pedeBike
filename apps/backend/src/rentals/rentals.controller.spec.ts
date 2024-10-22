import { Test, TestingModule } from '@nestjs/testing';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';

describe('RentalsController', () => {
  let controller: RentalsController;

  const mockRental = {
    id: 1,
    userId: 1,
    bikeId: 1,
    startTime: new Date(),
    endTime: null,
    totalPrice: 0,
    status: 'ONGOING',
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
      providers: [{ provide: RentalsService, useValue: mockRentalsService }],
    }).compile();

    controller = module.get<RentalsController>(RentalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a rental', async () => {
    const rental = await controller.create({ userId: 1, bikeId: 1, startTime: new Date(), status: 'ONGOING' });
    expect(rental).toEqual(mockRental);
  });

  it('should return all rentals', async () => {
    const rentals = await controller.findAll();
    expect(rentals).toEqual([mockRental]);
  });

  it('should return a rental by ID', async () => {
    const rental = await controller.findOne('1');
    expect(rental).toEqual(mockRental);
  });

  it('should delete a rental', async () => {
    const deletedRental = await controller.remove('1');
    expect(deletedRental).toEqual(mockRental);
  });
});
