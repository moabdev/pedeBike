import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { BikeCondition, BikeType } from '@prisma/client';

export class CreateBikeDto {
  @ApiProperty({ example: 'Mountain Bike' })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({ example: 'Location A' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ enum: BikeType })
  @IsEnum(BikeType)
  type: BikeType;

  @ApiProperty({ enum: BikeCondition })
  @IsEnum(BikeCondition)
  condition: BikeCondition;

  @ApiProperty({ example: 15.0 })
  @IsNumber()
  pricePerHour: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  stock: number;

  @ApiProperty({ example: true })
  @IsOptional()
  isAvailable?: boolean;
}
