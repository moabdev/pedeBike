import { Test, TestingModule } from '@nestjs/testing';
import { CartItemsController } from './cart-items.controller';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItemDto } from './dto/cart-item.dto';
import { NotFoundException } from '@nestjs/common';

describe('CartItemsController', () => {
  let controller: CartItemsController;
  let service: CartItemsService;

  const mockCartItemDto: CartItemDto = {
    id: 1,
    cartId: 1,
    bikeId: 101,
    quantity: 2,
    hours: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCartItemsService = {
    create: jest.fn().mockResolvedValue(mockCartItemDto),
    findOne: jest.fn().mockResolvedValue(mockCartItemDto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartItemsController],
      providers: [
        {
          provide: CartItemsService,
          useValue: mockCartItemsService,
        },
      ],
    }).compile();

    controller = module.get<CartItemsController>(CartItemsController);
    service = module.get<CartItemsService>(CartItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new cart item', async () => {
      const createCartItemDto: CreateCartItemDto = { cartId: 1, bikeId: 101, quantity: 2, hours: 1 };
      const result = await controller.create(createCartItemDto);

      expect(service.create).toHaveBeenCalledWith(createCartItemDto);
      expect(result).toEqual(mockCartItemDto);
    });
  });

  describe('findOne', () => {
    it('should return a cart item by ID', async () => {
      const result = await controller.findOne('1');

      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCartItemDto);
    });

    it('should throw a NotFoundException if cart item is not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException('Cart item not found'));

      await expect(controller.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });
});
