import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CartItemDto {
  @IsInt()
  @ApiProperty({ description: 'Unique identifier for the cart item.' })
  id: number;

  @IsInt()
  @ApiProperty({ description: 'ID of the cart that the item belongs to.' })
  cartId: number;

  @IsInt()
  @ApiProperty({ description: 'ID of the bike associated with the cart item.' })
  bikeId: number;

  @IsInt()
  @ApiProperty({ description: 'Quantity of the bike in the cart item.' })
  quantity: number;

  @IsInt()
  @ApiProperty({ description: 'Number of hours the bike is rented for.' })
  hours: number;

  @ApiProperty({ description: 'Creation date of the cart item.' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date of the cart item.' })
  updatedAt: Date;
}
