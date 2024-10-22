import { Test, TestingModule } from '@nestjs/testing';
import { BikesController } from './bikes.controller';
import { BikesService } from './bikes.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';

const mockBikesService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('BikesController', () => {
  let controller: BikesController;
  let service: BikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BikesController],
      providers: [{ provide: BikesService, useValue: mockBikesService }],
    }).compile();

    controller = module.get<BikesController>(BikesController);
    service = module.get<BikesService>(BikesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new bike', async () => {
      const createBikeDto: CreateBikeDto = {
        model: 'Mountain Bike',
        location: 'Store 1',
        type: 'MOUNTAIN',
        condition: 'NEW',
        pricePerHour: 15.0,
        stock: 10,
      };

      mockBikesService.create.mockResolvedValue(createBikeDto);

      expect(await controller.create(createBikeDto)).toBe(createBikeDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of bikes', async () => {
      const result = [
        {
          id: 1,
          model: 'Mountain Bike',
          location: 'Store 1',
          type: 'MOUNTAIN',
          condition: 'NEW',
          pricePerHour: 15.0,
          stock: 10,
        },
      ];

      mockBikesService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a bike', async () => {
      const result = {
        id: 1,
        model: 'Mountain Bike',
        location: 'Store 1',
        type: 'MOUNTAIN',
        condition: 'NEW',
        pricePerHour: 15.0,
        stock: 10,
      };

      mockBikesService.findOne.mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a bike', async () => {
      const updateBikeDto: UpdateBikeDto = {
        model: 'New Model',
      };

      const updatedBike = { ...updateBikeDto, id: 1 };

      mockBikesService.update.mockResolvedValue(updatedBike);

      expect(await controller.update('1', updateBikeDto)).toBe(updatedBike);
    });
  });

  describe('remove', () => {
    it('should remove a bike', async () => {
      const bike = {
        id: 1,
        model: 'Mountain Bike',
      };

      mockBikesService.remove.mockResolvedValue(bike);

      expect(await controller.remove('1')).toBe(bike);
    });
  });
});
