import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BikeService } from './bikes.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { BikeDto } from './dto/bike.dto';

@ApiTags('bikes')
@Controller('bikes')
export class BikeController {
  constructor(private readonly bikeService: BikeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new bike' })
  @ApiResponse({ status: 201, description: 'Bike created successfully', type: BikeDto })
  async create(@Body() createBikeDto: CreateBikeDto): Promise<BikeDto> {
    return this.bikeService.create(createBikeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all bikes' })
  @ApiResponse({ status: 200, description: 'List of bikes returned', type: [BikeDto] })
  async findAll(): Promise<BikeDto[]> {
    return this.bikeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a bike by ID' })
  @ApiResponse({ status: 200, description: 'Bike found', type: BikeDto })
  @ApiResponse({ status: 404, description: 'Bike not found' })
  async findOne(@Param('id') id: string): Promise<BikeDto> {
    return this.bikeService.findOne(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a bike by ID' })
  @ApiResponse({ status: 200, description: 'Bike updated successfully', type: BikeDto })
  @ApiResponse({ status: 404, description: 'Bike not found' })
  async update(@Param('id') id: string, @Body() updateBikeDto: UpdateBikeDto): Promise<BikeDto> {
    return this.bikeService.update(Number(id), updateBikeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a bike by ID' })
  @ApiResponse({ status: 200, description: 'Bike removed successfully', type: BikeDto })
  @ApiResponse({ status: 404, description: 'Bike not found' })
  async remove(@Param('id') id: string): Promise<BikeDto> {
    return this.bikeService.remove(Number(id));
  }
}
