import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsService } from './payments.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from '@prisma/client';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let prismaService: PrismaService;

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

  const mockPrismaService = {
    payment: {
      create: jest.fn().mockResolvedValue(mockPayment),
      findMany: jest.fn().mockResolvedValue([mockPayment]),
      findUnique: jest.fn().mockResolvedValue(mockPayment),
      delete: jest.fn().mockResolvedValue(mockPayment),
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

  it('should create a payment', async () => {
    const createPaymentDto: CreatePaymentDto = {
      rentalId: 1,
      amount: 100,
      stripeSessionId: 'sess_12345',
      status: 'COMPLETED',
    };
    expect(await service.create(createPaymentDto)).toEqual(mockPayment);
  });

  it('should return all payments', async () => {
    expect(await service.findAll()).toEqual([mockPayment]);
  });

  it('should return a single payment', async () => {
    expect(await service.findOne(1)).toEqual(mockPayment);
  });

  it('should throw NotFoundException for non-existing payment', async () => {
    jest.spyOn(prismaService.payment, 'findUnique').mockResolvedValue(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should delete a payment', async () => {
    await expect(service.remove(1)).resolves.toEqual(mockPayment);
    expect(prismaService.payment.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should throw NotFoundException when trying to delete a non-existing payment', async () => {
    jest.spyOn(prismaService.payment, 'findUnique').mockResolvedValue(null);
    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });
});
