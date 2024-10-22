import { ApiProperty } from '@nestjs/swagger';
import { BikeCondition, BikeType } from '@prisma/client';

export class BikeDto {
  @ApiProperty({
    description: 'Unique identifier for the bike',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Model name of the bike',
    example: 'Mountain Bike 2023',
  })
  model: string;

  @ApiProperty({
    description: 'Location where the bike is stored or available',
    example: 'Downtown Rental Shop',
  })
  location: string;

  @ApiProperty({
    enum: BikeType,
    description: 'Type of bike, which could be ROAD, MOUNTAIN, URBAN, or ELECTRIC',
  })
  type: BikeType;

  @ApiProperty({
    enum: BikeCondition,
    description: 'Condition of the bike, which can be NEW, SEMINEW, or USED',
  })
  condition: BikeCondition;

  @ApiProperty({
    description: 'Rental price per hour for the bike',
    example: 15.99,
  })
  pricePerHour: number;

  @ApiProperty({
    description: 'Available stock of this bike model',
    example: 10,
  })
  stock: number;

  @ApiProperty({
    description: 'Indicates whether the bike is currently available for rent',
    example: true,
  })
  isAvailable: boolean;

  @ApiProperty({
    description: 'Timestamp when the bike was created in the database',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the bike record was last updated',
    example: '2023-01-10T00:00:00.000Z',
  })
  updatedAt: Date;
}
