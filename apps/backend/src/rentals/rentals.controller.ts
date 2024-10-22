import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { Rental } from '@prisma/client';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post()
  async create(@Body() createRentalDto: CreateRentalDto): Promise<Rental> {
    return this.rentalsService.create(createRentalDto);
  }

  @Get()
  async findAll(): Promise<Rental[]> {
    return this.rentalsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Rental> {
    return this.rentalsService.findOne(Number(id));
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Rental> {
    return this.rentalsService.remove(Number(id));
  }
}
