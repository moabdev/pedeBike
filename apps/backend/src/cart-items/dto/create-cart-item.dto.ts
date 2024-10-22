import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartItemDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID of the cart that the item belongs to.' })
  cartId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID of the bike associated with the cart item.' })
  bikeId: number;

  @IsInt()
  @ApiProperty({ description: 'Quantity of the bike in the cart item.', default: 1 })
  quantity: number;

  @IsInt()
  @ApiProperty({ description: 'Number of hours the bike is rented for.', default: 1 })
  hours: number;
}
