import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RentalsService } from './rentals.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { RentalDto } from './dto/rental.dto';

@ApiTags('rentals')
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new rental' })
  @ApiResponse({ status: 201, description: 'Rental created successfully', type: RentalDto })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  async create(@Body() createRentalDto: CreateRentalDto): Promise<RentalDto> {
    return this.rentalsService.create(createRentalDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get rental by ID' })
  @ApiResponse({ status: 200, description: 'Rental found', type: RentalDto })
  @ApiResponse({ status: 404, description: 'Rental not found' })
  async findOne(@Param('id') id: string): Promise<RentalDto> {
    return this.rentalsService.findOne(Number(id));
  }
}
