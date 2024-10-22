import { IsNotEmpty, IsNumber, IsString, IsEnum } from 'class-validator';
import { PaymentStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  rentalId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  stripeSessionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}
