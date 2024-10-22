import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentDto } from './dto/payment.dto';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let service: PaymentsService;

  const mockPaymentDto: PaymentDto = {
    id: 1,
    rentalId: 101,
    amount: 200.0,
    stripeSessionId: 'sess_123',
    paymentDate: new Date(),
    status: 'PENDING',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPaymentsService = {
    create: jest.fn().mockResolvedValue(mockPaymentDto),
    findOne: jest.fn().mockResolvedValue(mockPaymentDto),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [
        {
          provide: PaymentsService,
          useValue: mockPaymentsService,
        },
      ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    service = module.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a payment', async () => {
      const createPaymentDto: CreatePaymentDto = {
        rentalId: 101,
        amount: 200.0,
        stripeSessionId: 'sess_123',
        status: 'PENDING',
      };

      const result = await controller.create(createPaymentDto);
      expect(service.create).toHaveBeenCalledWith(createPaymentDto);
      expect(result).toEqual(mockPaymentDto);
    });
  });

  describe('findOne', () => {
    it('should return a payment by ID', async () => {
      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockPaymentDto);
    });
  });
});
