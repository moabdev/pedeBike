import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importando ApiProperty para Swagger

export class CreateCartItemDto {
  @ApiProperty({ description: 'ID do carrinho', example: 1 }) // Descrição para Swagger
  @IsInt()
  @IsNotEmpty()
  cartId: number;

  @ApiProperty({ description: 'ID da bicicleta', example: 1 }) // Descrição para Swagger
  @IsInt()
  @IsNotEmpty()
  bikeId: number;

  @ApiProperty({ description: 'Quantidade', example: 2 }) // Descrição para Swagger
  @IsInt()
  quantity: number;

  @ApiProperty({ description: 'Horas', example: 5 }) // Descrição para Swagger
  @IsInt()
  hours: number;
}
