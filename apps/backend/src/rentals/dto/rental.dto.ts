import { IsInt, IsNotEmpty, IsDate, IsOptional, IsEnum } from 'class-validator';
import { RentalStatus } from '@prisma/client'; // Importando o enum RentalStatus

export class RentalDto {
  @IsInt()
  id: number;

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
  totalPrice: number;

  @IsEnum(RentalStatus)
  status: RentalStatus;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;

  // Aqui você pode incluir outros relacionamentos se necessário
}
