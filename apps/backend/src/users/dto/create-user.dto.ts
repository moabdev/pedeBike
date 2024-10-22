import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Name of the user', example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email of the user', example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Password for the user account', example: 'strongPassword123' })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Role of the user, default is USER',
    example: 'USER',
    required: false,
  })
  @IsOptional()
  @IsString()
  role?: Role;
}
