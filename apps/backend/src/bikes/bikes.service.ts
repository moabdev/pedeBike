import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { BikeDto } from './dto/bike.dto';

@Injectable()
export class BikesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBikeDto: CreateBikeDto): Promise<BikeDto> {
    const bike = await this.prisma.bike.create({
      data: createBikeDto,
    });

    return bike;
  }

  async findAll(): Promise<BikeDto[]> {
    return await this.prisma.bike.findMany();
  }

  async findOne(id: number): Promise<BikeDto> {
    const bike = await this.prisma.bike.findUnique({
      where: { id },
    });

    if (!bike) {
      throw new NotFoundException(`Bike with ID ${id} not found`);
    }

    return bike;
  }

  async update(id: number, updateBikeDto: UpdateBikeDto): Promise<BikeDto> {
    const bike = await this.prisma.bike.update({
      where: { id },
      data: updateBikeDto,
    });

    if (!bike) {
      throw new NotFoundException(`Bike with ID ${id} not found`);
    }

    return bike;
  }

  async remove(id: number): Promise<BikeDto> {
    const bike = await this.prisma.bike.findUnique({ where: { id } });
    if (!bike) {
      throw new NotFoundException(`Bike with ID ${id} not found`);
    }
    return this.prisma.bike.delete({ where: { id } });
  }
  
}
