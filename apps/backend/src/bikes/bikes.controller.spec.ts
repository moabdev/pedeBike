import { Test, TestingModule } from '@nestjs/testing';
import { BikeController } from './bikes.controller';
import { BikeService } from './bikes.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { BikeDto } from './dto/bike.dto';
import { NotFoundException } from '@nestjs/common';

describe('BikeController', () => {
  let controller: BikeController;
  let service: BikeService;

  const mockBike: BikeDto = {
    id: 1,
    model: 'Mountain Bike',
    location: 'Park',
    type: 'MOUNTAIN',
    condition: 'NEW',
    pricePerHour: 10.0,
    stock: 5,
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockBikeService = {
    create: jest.fn().mockResolvedValue(mockBike),
    findAll: jest.fn().mockResolvedValue([mockBike]),
    findOne: jest.fn().mockResolvedValue(mockBike),
    update: jest.fn().mockResolvedValue(mockBike),
    remove: jest.fn().mockResolvedValue(mockBike),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BikeController],
      providers: [
        {
          provide: BikeService,
          useValue: mockBikeService,
        },
      ],
    }).compile();

    controller = module.get<BikeController>(BikeController);
    service = module.get<BikeService>(BikeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new bike', async () => {
      const createBikeDto: CreateBikeDto = {
        model: 'Mountain Bike',
        location: 'Park',
        type: 'MOUNTAIN',
        condition: 'NEW',
        pricePerHour: 10.0,
        stock: 5,
        isAvailable: true,
      };

      const result = await controller.create(createBikeDto);

      expect(service.create).toHaveBeenCalledWith(createBikeDto);
      expect(result).toEqual(mockBike);
    });
  });

  describe('findAll', () => {
    it('should return an array of bikes', async () => {
      const result = await controller.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockBike]);
    });
  });

  describe('findOne', () => {
    it('should return a single bike by ID', async () => {
      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockBike);
    });

    it('should throw a 404 error if bike is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException());

      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a bike by ID', async () => {
      const updateBikeDto: UpdateBikeDto = { pricePerHour: 15.0 };

      const result = await controller.update('1', updateBikeDto);

      expect(service.update).toHaveBeenCalledWith(1, updateBikeDto);
      expect(result).toEqual(mockBike);
    });
  });

  describe('remove', () => {
    it('should remove a bike by ID', async () => {
      const result = await controller.remove('1');

      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockBike);
    });
  });
});
