import { Module } from '@nestjs/common';
import { BikesService } from './bikes.service';
import { BikesController } from './bikes.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaService],
  controllers: [BikesController],
  providers: [BikesService],
})
export class BikesModule {}
