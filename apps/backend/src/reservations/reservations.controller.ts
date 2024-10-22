import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReservationDto } from './dto/reservation.dto';

@ApiTags('reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a reservation' })
  @ApiResponse({ status: 201, description: 'The reservation has been successfully created.', type: ReservationDto })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createReservationDto: CreateReservationDto): Promise<Reservation> {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all reservations' })
  @ApiResponse({ status: 200, description: 'List of all reservations.', type: [ReservationDto] })
  findAll(): Promise<Reservation[]> {
    return this.reservationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a reservation by ID' })
  @ApiResponse({ status: 200, description: 'The found reservation.', type: ReservationDto })
  @ApiResponse({ status: 404, description: 'Reservation not found.' })
  findOne(@Param('id') id: string): Promise<Reservation> {
    return this.reservationsService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a reservation by ID' })
  @ApiResponse({ status: 200, description: 'The reservation has been successfully deleted.', type: ReservationDto })
  @ApiResponse({ status: 404, description: 'Reservation not found.' })
  remove(@Param('id') id: string): Promise<Reservation> {
    return this.reservationsService.remove(+id);
  }
}
  