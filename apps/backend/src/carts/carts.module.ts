import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaService],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
