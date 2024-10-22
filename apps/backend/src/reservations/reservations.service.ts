import { Injectable, NotFoundException } from '@nestjs/common';
import { Reservation } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateReservationDto): Promise<Reservation> {
    return this.prisma.reservation.create({ data });
  }

  async findAll(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany();
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.prisma.reservation.findUnique({ where: { id } });
    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
    return reservation;
  }

  async remove(id: number): Promise<Reservation> {
    await this.findOne(id);
    return this.prisma.reservation.delete({ where: { id } });
  }
}
