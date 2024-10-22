import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus } from '@prisma/client';

export class CreatePaymentDto {
  @ApiProperty({ example: 100.0, description: 'Amount to be paid' })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'cs_test_a1b2c3d4e5f6g7h8', description: 'Stripe session ID for the payment' })
  @IsNotEmpty()
  @IsString()
  stripeSessionId: string;

  @ApiProperty({ example: '5', description: 'Rental ID associated with the payment' })
  @IsNumber()
  rentalId: number;

  @ApiProperty({ example: 'PENDING', description: 'Status of the payment' })
  @IsNotEmpty()
  @IsEnum({enum: PaymentStatus})
  status: PaymentStatus;
}
