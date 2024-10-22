import { Injectable, NotFoundException } from '@nestjs/common';
import { Reservation } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ReservationDto } from './dto/reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReservationDto: CreateReservationDto): Promise<ReservationDto> {
    const reservation = await this.prisma.reservation.create({
      data: createReservationDto,
    });
    return this.mapToDto(reservation);
  }

  async findOne(id: number): Promise<ReservationDto> {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }

    return this.mapToDto(reservation);
  }

  private mapToDto(reservation: Reservation): ReservationDto {
    return {
      id: reservation.id,
      userId: reservation.userId,
      bikeId: reservation.bikeId,
      startTime: reservation.startTime,
      endTime: reservation.endTime,
      status: reservation.status,
      createdAt: reservation.createdAt,
      updatedAt: reservation.updatedAt,
    };
  }
}
