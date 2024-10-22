import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importando o decorator do Swagger
import { BikeType, BikeCondition } from '@prisma/client';

export class CreateBikeDto {
  @ApiProperty({ description: 'Modelo da bicicleta' }) // Decorador para a propriedade 'model'
  @IsNotEmpty()
  @IsString()
  model: string;

  @ApiProperty({ description: 'Localização da bicicleta' }) // Decorador para a propriedade 'location'
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ enum: BikeType, description: 'Tipo da bicicleta' }) // Decorador para a propriedade 'type'
  @IsEnum(BikeType)
  type: BikeType;

  @ApiProperty({ enum: BikeCondition, description: 'Condição da bicicleta' }) // Decorador para a propriedade 'condition'
  @IsEnum(BikeCondition)
  condition: BikeCondition;

  @ApiProperty({ description: 'Preço por hora da bicicleta' }) // Decorador para a propriedade 'pricePerHour'
  @IsNotEmpty()
  @IsNumber()
  pricePerHour: number;

  @ApiProperty({ description: 'Quantidade de bicicletas em estoque' }) // Decorador para a propriedade 'stock'
  @IsNotEmpty()
  @IsNumber()
  stock: number;
}
