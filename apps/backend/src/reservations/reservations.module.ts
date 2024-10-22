import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaService ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
