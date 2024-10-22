import { Test, TestingModule } from '@nestjs/testing';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartDto } from './dto/cart.dto';
import { NotFoundException } from '@nestjs/common';

describe('CartsController', () => {
  let controller: CartsController;
  let service: CartsService;

  const mockCartDto: CartDto = {
    id: 1,
    userId: 1,
    items: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCartsService = {
    create: jest.fn().mockResolvedValue(mockCartDto),
    findOne: jest.fn().mockResolvedValue(mockCartDto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartsController],
      providers: [
        {
          provide: CartsService,
          useValue: mockCartsService,
        },
      ],
    }).compile();

    controller = module.get<CartsController>(CartsController);
    service = module.get<CartsService>(CartsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new cart', async () => {
      const createCartDto: CreateCartDto = { userId: 1 };
      const result = await controller.create(createCartDto);

      expect(service.create).toHaveBeenCalledWith(createCartDto);
      expect(result).toEqual(mockCartDto);
    });
  });

  describe('findOne', () => {
    it('should return a cart by ID', async () => {
      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCartDto);
    });

    it('should throw a NotFoundException if cart is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException(`Cart with ID 999 not found`));

      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
      await expect(controller.findOne('999')).rejects.toThrow('Cart with ID 999 not found');
    });
  });
});
