import { Test, TestingModule } from '@nestjs/testing';
import { BikesController } from './bikes.controller';
import { BikesService } from './bikes.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { Bike } from '@prisma/client';

describe('BikesController', () => {
  let controller: BikesController;
  let service: BikesService;

  const mockBike: Bike = {
    id: 1,
    model: 'Mountain Bike',
    location: 'Park',
    type: 'MOUNTAIN',
    condition: 'NEW',
    pricePerHour: 15.5,
    stock: 10,
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BikesController],
      providers: [
        {
          provide: BikesService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockBike),
            findAll: jest.fn().mockResolvedValue([mockBike]),
            findOne: jest.fn().mockResolvedValue(mockBike),
            update: jest.fn().mockResolvedValue(mockBike),
            remove: jest.fn().mockResolvedValue(mockBike),
          },
        },
      ],
    }).compile();

    controller = module.get<BikesController>(BikesController);
    service = module.get<BikesService>(BikesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a bike', async () => {
      const createBikeDto: CreateBikeDto = {
        model: 'Mountain Bike',
        location: 'Park',
        type: 'MOUNTAIN',
        condition: 'NEW',
        pricePerHour: 15.5,
        stock: 10,
        isAvailable: true,
      };
      expect(await controller.create(createBikeDto)).toEqual(mockBike);
      expect(service.create).toHaveBeenCalledWith(createBikeDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of bikes', async () => {
      const bikes = await controller.findAll();
      expect(bikes).toEqual([mockBike]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a bike', async () => {
      const bike = await controller.findOne('1');
      expect(bike).toEqual(mockBike);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update a bike', async () => {
      const updateBikeDto: Partial<CreateBikeDto> = {
        model: 'Updated Bike',
      };
      const bike = await controller.update('1', updateBikeDto);
      expect(bike).toEqual(mockBike);
      expect(service.update).toHaveBeenCalledWith(1, updateBikeDto);
    });
  });

  describe('remove', () => {
    it('should remove a bike', async () => {
      const bike = await controller.remove('1');
      expect(bike).toEqual(mockBike);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
