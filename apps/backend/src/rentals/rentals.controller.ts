// src/rentals/rentals.controller.ts

import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { RentalDto } from './dto/rental.dto'; // Importando o novo DTO
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('rentals')
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a rental' })
  @ApiResponse({ status: 201, description: 'Rental successfully created.', type: RentalDto })
  async create(@Body() createRentalDto: CreateRentalDto): Promise<RentalDto> {
    const rental = await this.rentalsService.create(createRentalDto);
    return rental as RentalDto; // Retorne o DTO apropriado
  }

  @Get()
  @ApiOperation({ summary: 'Get all rentals' })
  @ApiResponse({ status: 200, description: 'Return all rentals.', type: [RentalDto] })
  async findAll(): Promise<RentalDto[]> {
    const rentals = await this.rentalsService.findAll();
    return rentals as RentalDto[]; // Retorne o array de DTOs
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a rental by ID' })
  @ApiResponse({ status: 200, description: 'Return a rental by ID.', type: RentalDto })
  @ApiResponse({ status: 404, description: 'Rental not found.' })
  async findOne(@Param('id') id: string): Promise<RentalDto> {
    const rental = await this.rentalsService.findOne(Number(id));
    return rental as RentalDto; // Retorne o DTO apropriado
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a rental by ID' })
  @ApiResponse({ status: 200, description: 'Rental successfully deleted.', type: RentalDto })
  @ApiResponse({ status: 404, description: 'Rental not found.' })
  async remove(@Param('id') id: string): Promise<RentalDto> {
    const rental = await this.rentalsService.remove(Number(id));
    return rental as RentalDto; // Retorne o DTO apropriado
  }
}
