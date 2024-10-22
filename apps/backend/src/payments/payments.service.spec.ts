import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { PrismaService } from '../prisma/prisma.service';
import { Payment } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentDto } from './dto/payment.dto';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let prismaService: PrismaService;

  const mockPayment: Payment = {
    id: 1,
    rentalId: 101,
    amount: 200.0,
    stripeSessionId: 'sess_123',
    paymentDate: new Date(),
    status: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPrismaService = {
    payment: {
      create: jest.fn().mockResolvedValue(mockPayment),
      findUnique: jest.fn().mockResolvedValue(mockPayment),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<PaymentsService>(PaymentsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a payment', async () => {
      const createPaymentDto: CreatePaymentDto = {
        rentalId: 101,
        amount: 200.0,
        stripeSessionId: 'sess_123',
        status: 'PENDING',
      };
      const result: PaymentDto = await service.create(createPaymentDto);

      expect(prismaService.payment.create).toHaveBeenCalledWith({
        data: createPaymentDto,
      });
      expect(result).toEqual({
        id: mockPayment.id,
        rentalId: mockPayment.rentalId,
        amount: mockPayment.amount,
        stripeSessionId: mockPayment.stripeSessionId,
        paymentDate: mockPayment.paymentDate,
        status: mockPayment.status,
        createdAt: mockPayment.createdAt,
        updatedAt: mockPayment.updatedAt,
      });
    });
  });

  describe('findOne', () => {
    it('should return a payment by ID', async () => {
      const result: PaymentDto = await service.findOne(1);

      expect(prismaService.payment.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual({
        id: mockPayment.id,
        rentalId: mockPayment.rentalId,
        amount: mockPayment.amount,
        stripeSessionId: mockPayment.stripeSessionId,
        paymentDate: mockPayment.paymentDate,
        status: mockPayment.status,
        createdAt: mockPayment.createdAt,
        updatedAt: mockPayment.updatedAt,
      });
    });

    it('should throw a NotFoundException if payment is not found', async () => {
      jest.spyOn(prismaService.payment, 'findUnique').mockResolvedValueOnce(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});
