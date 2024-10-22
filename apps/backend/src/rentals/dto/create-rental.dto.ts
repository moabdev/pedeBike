import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsDate } from 'class-validator';
import { RentalStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRentalDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  bikeId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  startTime: Date; 

  @ApiProperty()
  @IsOptional() 
  @IsDate()
  endTime?: Date; 

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(RentalStatus)
  status: RentalStatus;
}
