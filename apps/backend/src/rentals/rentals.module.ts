import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaService],
  controllers: [RentalsController],
  providers: [RentalsService],
})
export class RentalsModule {}
