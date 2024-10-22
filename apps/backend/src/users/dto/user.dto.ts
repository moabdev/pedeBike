import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserDto {
  @ApiProperty({ description: 'Unique identifier of the user', example: 1 })
  id: number;

  @ApiProperty({ description: 'Name of the user', example: 'John Doe' })
  name: string;

  @ApiProperty({ description: 'Email address of the user', example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ description: 'Role of the user', example: 'USER' })
  role: Role;

  @ApiProperty({ description: 'Account creation timestamp', example: '2023-01-01T12:34:56.789Z' })
  createdAt: Date;

  @ApiProperty({ description: 'Account last updated timestamp', example: '2023-01-10T12:34:56.789Z' })
  updatedAt: Date;

  @ApiProperty({ description: 'List of rental IDs associated with the user', type: [Number], example: [1, 2, 3] })
  rentalIds: number[];

  @ApiProperty({ description: 'Shopping cart ID of the user, if any', nullable: true, example: 1 })
  cartId: number | null;

  @ApiProperty({ description: 'List of reservation IDs made by the user', type: [Number], example: [1, 2] })
  reservationIds: number[];
}
