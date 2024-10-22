import { Injectable, NotFoundException } from '@nestjs/common';
import { Rental } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { RentalDto } from './dto/rental.dto';

@Injectable()
export class RentalsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRentalDto: CreateRentalDto): Promise<RentalDto> {
    const rental = await this.prisma.rental.create({
      data: {
        userId: createRentalDto.userId,
        bikeId: createRentalDto.bikeId,
        startTime: createRentalDto.startTime,
        endTime: createRentalDto.endTime,
        totalPrice: createRentalDto.totalPrice,
        status: createRentalDto.status,
      },
    });
    
    return this.mapToDto(rental);
  }

  async findOne(id: number): Promise<RentalDto> {
    const rental = await this.prisma.rental.findUnique({
      where: { id },
    });

    if (!rental) {
      throw new NotFoundException(`Rental with ID ${id} not found`);
    }

    return this.mapToDto(rental);
  }

  private mapToDto(rental: Rental): RentalDto {
    return {
      id: rental.id,
      userId: rental.userId,
      bikeId: rental.bikeId,
      startTime: rental.startTime,
      endTime: rental.endTime,
      totalPrice: rental.totalPrice,
      status: rental.status,
      createdAt: rental.createdAt,
      updatedAt: rental.updatedAt,
    };
  }
}
