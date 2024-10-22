import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus, Payment as PrismaPayment } from '@prisma/client';

export class PaymentDto implements PrismaPayment {
  @ApiProperty()
  id: number;

  @ApiProperty()
  rentalId: number;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  stripeSessionId: string;

  @ApiProperty()
  paymentDate: Date;

  @ApiProperty()
  status: PaymentStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}