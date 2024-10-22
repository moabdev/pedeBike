import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service: PaymentsService;

  const mockPayment: Payment = {
    id: 1,
    rentalId: 1,
    amount: 100,
    stripeSessionId: 'sess_12345',
    paymentDate: new Date(),
    status: 'COMPLETED',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPaymentsService = {
    create: jest.fn().mockResolvedValue(mockPayment),
    findAll: jest.fn().mockResolvedValue([mockPayment]),
    findOne: jest.fn().mockResolvedValue(mockPayment),
    remove: jest.fn().mockResolvedValue(mockPayment),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        { provide: PaymentsService, useValue: mockPaymentsService },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should create a payment', async () => {
    const createPaymentDto: CreatePaymentDto = {
      rentalId: 1,
      amount: 100,
      stripeSessionId: 'sess_12345',
      status: 'COMPLETED',
    };
    expect(await controller.create(createPaymentDto)).toEqual(mockPayment);
    expect(service.create).toHaveBeenCalledWith(createPaymentDto);
  });

  it('should return all payments', async () => {
    expect(await controller.findAll()).toEqual([mockPayment]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should return a single payment', async () => {
    expect(await controller.findOne('1')).toEqual(mockPayment);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('should delete a payment', async () => {
    expect(await controller.remove('1')).toEqual(mockPayment);
    expect(service.remove).toHaveBeenCalledWith(1);
  });

  it('should throw a NotFoundException when payment not found', async () => {
    jest.spyOn(service, 'findOne').mockRejectedValueOnce(new NotFoundException('Payment not found'));

    await expect(controller.findOne('2')).rejects.toThrow(NotFoundException);
  });
});
