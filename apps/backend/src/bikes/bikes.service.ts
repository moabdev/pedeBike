import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { Bike } from '@prisma/client';

@Injectable()
export class BikesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateBikeDto): Promise<Bike> {
    return this.prisma.bike.create({ data });
  }

  async findAll(): Promise<Bike[]> {
    return this.prisma.bike.findMany();
  }

  async findOne(id: number): Promise<Bike> {
    const bike = await this.prisma.bike.findUnique({ where: { id } });
    if (!bike) {
      throw new NotFoundException(`Bike with ID ${id} not found`);
    }
    return bike;
  }

  async update(id: number, data: UpdateBikeDto): Promise<Bike> {
    await this.findOne(id);
    return this.prisma.bike.update({ where: { id }, data });
  }

  async remove(id: number): Promise<Bike> {
    await this.findOne(id);
    return this.prisma.bike.delete({ where: { id } });
  }
}
