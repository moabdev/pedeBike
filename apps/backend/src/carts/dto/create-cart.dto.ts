import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ description: 'User ID associated with the cart', example: 1 })
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
