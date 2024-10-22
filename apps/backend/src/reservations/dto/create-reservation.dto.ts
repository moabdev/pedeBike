import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ReservationStatus } from '@prisma/client';

export class CreateReservationDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  bikeId: number;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsNotEmpty()
  @IsEnum(ReservationStatus)
  status: ReservationStatus;
}
