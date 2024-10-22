import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { BikeCondition, BikeType } from '@prisma/client';

export class UpdateBikeDto {
  @ApiProperty({ example: 'Mountain Bike', required: false })
  @IsOptional()
  @IsString()
  model?: string;

  @ApiProperty({ example: 'Location A', required: false })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiProperty({ enum: BikeType, required: false })
  @IsOptional()
  @IsEnum(BikeType)
  type?: BikeType;

  @ApiProperty({ enum: BikeCondition, required: false })
  @IsOptional()
  @IsEnum(BikeCondition)
  condition?: BikeCondition;

  @ApiProperty({ example: 15.0, required: false })
  @IsOptional()
  @IsNumber()
  pricePerHour?: number;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsNumber()
  stock?: number;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  isAvailable?: boolean;
}
