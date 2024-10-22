import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus, Rental } from '@prisma/client'; // Ajuste conforme sua estrutura de projeto

export class PaymentDto {
  @ApiProperty({ example: 1, description: 'Unique identifier of the payment' })
  id: number;

  @ApiProperty({ example: 1, description: 'Rental ID associated with the payment' })
  rentalId: number;

  @ApiProperty({ example: 100.0, description: 'Amount paid' })
  amount: number;

  @ApiProperty({ example: 'cs_test_a1b2c3d4e5f6g7h8', description: 'Stripe session ID for the payment' })
  stripeSessionId: string;

  @ApiProperty({ example: '2024-10-22T12:00:00Z', description: 'Date of the payment' })
  paymentDate: Date;

  @ApiProperty({ example: 'PENDING', description: 'Status of the payment' })
  status: PaymentStatus;

  @ApiProperty({ description: 'Creation timestamp of the payment' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp of the payment' })
  updatedAt: Date;
}
