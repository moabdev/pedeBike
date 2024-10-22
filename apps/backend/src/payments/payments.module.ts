import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaymentsController } from './payments.controller';

@Module({
  imports: [PrismaService],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
