import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID of the user associated with the cart.' })
  userId: number;
}
