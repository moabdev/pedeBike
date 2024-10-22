import { ApiProperty } from '@nestjs/swagger';
import { BikeCondition, BikeType } from '@prisma/client';
import { IsNotEmpty, IsString, IsEnum, IsNumber, IsBoolean } from 'class-validator';

export class CreateBikeDto {
  @ApiProperty({
    description: 'Model name of the bike, must not be empty.',
    example: 'Mountain Bike 2023',
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    description: 'Location where the bike is available, must not be empty.',
    example: 'Downtown Rental Shop',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    enum: BikeType,
    description: 'Type of the bike, e.g., ROAD, MOUNTAIN, URBAN, or ELECTRIC.',
  })
  @IsEnum(BikeType)
  type: BikeType;

  @ApiProperty({
    enum: BikeCondition,
    description: 'Condition of the bike, can be NEW, SEMINEW, or USED.',
  })
  @IsEnum(BikeCondition)
  condition: BikeCondition;

  @ApiProperty({
    description: 'Rental price per hour for the bike.',
    example: 15.99,
  })
  @IsNumber()
  pricePerHour: number;

  @ApiProperty({
    description: 'Number of this bike model available for rent.',
    example: 10,
  })
  @IsNumber()
  stock: number;

  @ApiProperty({
    description: 'Indicates if the bike is currently available for rental.',
    example: true,
  })
  @IsBoolean()
  isAvailable: boolean;
}
