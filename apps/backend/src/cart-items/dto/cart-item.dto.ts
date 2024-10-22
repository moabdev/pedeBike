import { ApiProperty } from '@nestjs/swagger';
import { BikeDto } from '../../bikes/dto/bike.dto';

export class CartItemDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  cartId: number;

  @ApiProperty()
  bikeId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty({ type: () => BikeDto })
  bike: BikeDto;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  hours: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
