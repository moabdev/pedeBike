import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    return this.prisma.payment.create({ data: createPaymentDto });
  }

  async findAll(): Promise<Payment[]> {
    return this.prisma.payment.findMany();
  }

  async findOne(id: number): Promise<Payment> {
    const payment = await this.prisma.payment.findUnique({ where: { id } });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  async remove(id: number): Promise<Payment> {
    const payment = await this.findOne(id); // Valida se o pagamento existe
    return this.prisma.payment.delete({ where: { id } });
  }
}
