import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from '@prisma/client';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto): Promise<Reservation> {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  findAll(): Promise<Reservation[]> {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Reservation> {
    return this.reservationsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Reservation> {
    return this.reservationsService.remove(+id);
  }
}
