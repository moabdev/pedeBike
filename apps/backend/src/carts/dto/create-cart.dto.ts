import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Importando ApiProperty para Swagger

export class CreateCartDto {
  @ApiProperty({ description: 'ID do usuário', example: 1 }) // Descrição para Swagger
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
