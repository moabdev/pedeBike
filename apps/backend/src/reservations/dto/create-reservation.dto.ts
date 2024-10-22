import { IsInt, IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReservationStatus } from '@prisma/client';

export class CreateReservationDto {
  @ApiProperty({ description: 'ID of the user making the reservation' })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'ID of the bike being reserved' })
  @IsInt()
  @IsNotEmpty()
  bikeId: number;

  @ApiProperty({ description: 'Start time of the reservation' })
  @IsDate()
  @IsNotEmpty()
  startTime: Date;

  @ApiProperty({ description: 'End time of the reservation' })
  @IsDate()
  @IsNotEmpty()
  endTime: Date;

  @ApiProperty({
    description: 'Status of the reservation',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  @IsEnum(ReservationStatus)
  status?: ReservationStatus = ReservationStatus.PENDING;
}
