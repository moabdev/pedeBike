import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BikesService } from './bikes.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { BikeDto } from './dto/bike.dto';
import { Bike } from '@prisma/client';

@ApiTags('bikes')
@Controller('bikes')
export class BikesController {
  constructor(private readonly bikesService: BikesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new bike' })
  @ApiResponse({ status: 201, description: 'Bike created successfully.', type: BikeDto })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  async create(@Body() createBikeDto: CreateBikeDto): Promise<BikeDto> {
    const bike = await this.bikesService.create(createBikeDto);
    return bike; // Aqui você pode usar um mapeamento para o BikeDto se necessário
  }

  @Get()
  @ApiOperation({ summary: 'Get all bikes' })
  @ApiResponse({ status: 200, description: 'List of bikes returned.', type: [BikeDto] })
  async findAll(): Promise<BikeDto[]> {
    const bikes = await this.bikesService.findAll();
    return bikes; // Aqui você pode usar um mapeamento para o BikeDto se necessário
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a bike by ID' })
  @ApiResponse({ status: 200, description: 'Bike found.', type: BikeDto })
  @ApiResponse({ status: 404, description: 'Bike not found.' })
  async findOne(@Param('id') id: string): Promise<BikeDto> {
    const bike = await this.bikesService.findOne(+id);
    return bike; // Aqui você pode usar um mapeamento para o BikeDto se necessário
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a bike by ID' })
  @ApiResponse({ status: 200, description: 'Bike updated successfully.', type: BikeDto })
  @ApiResponse({ status: 404, description: 'Bike not found.' })
  async update(@Param('id') id: string, @Body() updateBikeDto: Partial<CreateBikeDto>): Promise<BikeDto> {
    const bike = await this.bikesService.update(+id, updateBikeDto);
    return bike; // Aqui você pode usar um mapeamento para o BikeDto se necessário
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a bike by ID' })
  @ApiResponse({ status: 200, description: 'Bike removed successfully.', type: BikeDto })
  @ApiResponse({ status: 404, description: 'Bike not found.' })
  async remove(@Param('id') id: string): Promise<BikeDto> {
    const bike = await this.bikesService.remove(+id);
    return bike; // Aqui você pode usar um mapeamento para o BikeDto se necessário
  }
}
