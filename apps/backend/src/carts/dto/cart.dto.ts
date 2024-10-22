import { ApiProperty } from '@nestjs/swagger';
import { CartItemDto } from '../../cart-items/dto/cart-item.dto';

export class CartDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: () => [CartItemDto] }) 
  items: CartItemDto[];
}
