import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartItemDto {
  @ApiProperty({ description: 'ID of the cart', example: 1 })
  @IsInt()
  @IsNotEmpty()
  cartId: number;

  @ApiProperty({ description: 'ID of the bike', example: 1 })
  @IsInt()
  @IsNotEmpty()
  bikeId: number;

  @ApiProperty({ description: 'Quantity', example: 2 })
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ description: 'Hours', example: 5 })
  @IsInt()
  @IsNotEmpty()
  hours: number;
}
