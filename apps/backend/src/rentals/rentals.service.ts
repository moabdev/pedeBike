import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { RentalDto } from './dto/rental.dto';

@Injectable()
export class RentalsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateRentalDto): Promise<RentalDto> {
    const rental = await this.prisma.rental.create({ data });
    return rental as RentalDto; // Retorne o DTO apropriado
  }

  async findAll(): Promise<RentalDto[]> {
    const rentals = await this.prisma.rental.findMany();
    return rentals as RentalDto[]; // Retorne o array de DTOs
  }

  async findOne(id: number): Promise<RentalDto> {
    const rental = await this.prisma.rental.findUnique({ where: { id } });
    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found`);
    }
    return rental as RentalDto; // Retorne o DTO apropriado
  }

  async remove(id: number): Promise<RentalDto> {
    const rental = await this.findOne(id);
    await this.prisma.rental.delete({ where: { id } });
    return rental;
  }
}
