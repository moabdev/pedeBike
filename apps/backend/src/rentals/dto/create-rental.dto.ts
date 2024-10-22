import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsDate } from 'class-validator';
import { RentalStatus } from '@prisma/client';

export class CreateRentalDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  bikeId: number;

  @IsNotEmpty()
  @IsDate()
  startTime: Date; 

  @IsOptional() 
  @IsDate()
  endTime?: Date; 

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsNotEmpty()
  @IsEnum(RentalStatus)
  status: RentalStatus;
}
