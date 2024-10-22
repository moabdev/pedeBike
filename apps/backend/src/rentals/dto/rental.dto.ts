import { ApiProperty } from '@nestjs/swagger';
import { RentalStatus, Rental as PrismaRental } from '@prisma/client';

export class RentalDto implements PrismaRental {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  bikeId: number;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endTime: Date;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  status: RentalStatus;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
