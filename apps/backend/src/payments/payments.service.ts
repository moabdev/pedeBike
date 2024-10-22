import { Injectable, NotFoundException } from '@nestjs/common';
import { Payment } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentDto } from './dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<PaymentDto> {
    const payment = await this.prisma.payment.create({
      data: createPaymentDto,
    });
    return this.mapToDto(payment);
  }

  async findOne(id: number): Promise<PaymentDto> {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return this.mapToDto(payment);
  }

  private mapToDto(payment: Payment): PaymentDto {
    return {
      id: payment.id,
      rentalId: payment.rentalId,
      amount: payment.amount,
      stripeSessionId: payment.stripeSessionId,
      paymentDate: payment.paymentDate,
      status: payment.status,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
    };
  }
}
