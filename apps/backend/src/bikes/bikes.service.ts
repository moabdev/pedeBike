import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Supondo que você tenha um serviço Prisma
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { BikeDto } from './dto/bike.dto';
import { Bike } from '@prisma/client';

@Injectable()
export class BikeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBikeDto: CreateBikeDto): Promise<BikeDto> {
    const bike = await this.prisma.bike.create({
      data: createBikeDto,
    });
    return this.mapToDto(bike);
  }

  async findAll(): Promise<BikeDto[]> {
    const bikes = await this.prisma.bike.findMany();
    return bikes.map(this.mapToDto);
  }

  async findOne(id: number): Promise<BikeDto> {
    const bike = await this.prisma.bike.findUnique({
      where: { id },
    });
    if (!bike) {
      throw new NotFoundException(`Bike with ID ${id} not found`);
    }
    return this.mapToDto(bike);
  }

  async update(id: number, updateBikeDto: UpdateBikeDto): Promise<BikeDto> {
    const bike = await this.prisma.bike.update({
      where: { id },
      data: updateBikeDto,
    });
    return this.mapToDto(bike);
  }

  async remove(id: number): Promise<BikeDto> {
    const bike = await this.prisma.bike.delete({
      where: { id },
    });
    return this.mapToDto(bike);
  }

  private mapToDto(bike: Bike): BikeDto {
    return {
      id: bike.id,
      model: bike.model,
      location: bike.location,
      type: bike.type,
      condition: bike.condition,
      pricePerHour: bike.pricePerHour,
      stock: bike.stock,
      isAvailable: bike.isAvailable,
      createdAt: bike.createdAt,
      updatedAt: bike.updatedAt,
    };
  }
}
