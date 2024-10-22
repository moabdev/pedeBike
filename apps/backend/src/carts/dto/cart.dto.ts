import { IsInt, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CartItemDto } from '../../cart-items/dto/cart-item.dto';

export class CartDto {
  @IsInt()
  @ApiProperty({ description: 'Unique identifier for the cart.' })
  id: number;

  @IsInt()
  @ApiProperty({ description: 'ID of the user associated with the cart.' })
  userId: number;

  @IsArray()
  @ApiProperty({ type: [CartItemDto], description: 'List of items in the cart.' })
  items: CartItemDto[];

  @ApiProperty({ description: 'Creation date of the cart.' })
  createdAt: Date;

  @ApiProperty({ description: 'Last update date of the cart.' })
  updatedAt: Date;
}
