import { IsInt, IsNotEmpty, IsDate, IsOptional, IsEnum } from 'class-validator';
import { RentalStatus } from '@prisma/client'; // Importando o enum RentalStatus

export class CreateRentalDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  bikeId: number;

  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @IsDate()
  @IsOptional()
  endTime?: Date;

  @IsInt()
  @IsOptional()
  totalPrice?: number;

  @IsEnum(RentalStatus)
  @IsOptional()
  status?: RentalStatus;
}
