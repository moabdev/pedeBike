import { Injectable, NotFoundException } from '@nestjs/common';
import { Rental } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRentalDto } from './dto/create-rental.dto';

@Injectable()
export class RentalsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRentalDto): Promise<Rental> {
    // Garantir que os campos estão sendo passados corretamente
    return this.prisma.rental.create({
      data: {
        userId: data.userId,
        bikeId: data.bikeId,
        startTime: data.startTime,
        endTime: data.endTime,
        totalPrice: data.totalPrice || 0.0,
        status: data.status,
      },
    });
  }

  async findAll(): Promise<Rental[]> {
    return this.prisma.rental.findMany();
  }

  async findOne(id: number): Promise<Rental> {
    const rental = await this.prisma.rental.findUnique({ where: { id } });
    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found`);
    }
    return rental;
  }

  async remove(id: number): Promise<Rental> {
    await this.findOne(id);
    return this.prisma.rental.delete({ where: { id } });
  }
}
