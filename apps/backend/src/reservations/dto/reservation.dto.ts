import { IsInt, IsDate, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ReservationStatus } from '@prisma/client';

export class ReservationDto {
  @ApiProperty({ description: 'ID of the reservation' })
  @IsInt()
  id: number;

  @ApiProperty({ description: 'ID of the user making the reservation' })
  @IsInt()
  userId: number;

  @ApiProperty({ description: 'ID of the bike being reserved' })
  @IsInt()
  bikeId: number;

  @ApiProperty({ description: 'Start time of the reservation' })
  @IsDate()
  startTime: Date;

  @ApiProperty({ description: 'End time of the reservation' })
  @IsDate()
  endTime: Date;

  @ApiProperty({
    description: 'Status of the reservation',
    enum: ReservationStatus,
  })
  @IsEnum(ReservationStatus)
  status: ReservationStatus;

  @ApiProperty({ description: 'Creation date of the reservation' })
  @IsDate()
  createdAt: Date;

  @ApiProperty({ description: 'Last updated date of the reservation' })
  @IsDate()
  updatedAt: Date;
}
