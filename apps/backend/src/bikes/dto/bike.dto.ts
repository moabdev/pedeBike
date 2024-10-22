import { ApiProperty } from '@nestjs/swagger';
import { BikeCondition, BikeType } from '@prisma/client';

export class BikeDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  model: string;

  @ApiProperty()
  location: string;

  @ApiProperty({ enum: BikeType })
  type: BikeType;

  @ApiProperty({ enum: BikeCondition })
  condition: BikeCondition;

  @ApiProperty()
  pricePerHour: number;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  isAvailable: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
