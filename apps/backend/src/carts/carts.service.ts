import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCartDto): Promise<Cart> {
    return this.prisma.cart.create({ data });
  }

  async findAll(): Promise<Cart[]> {
    return this.prisma.cart.findMany();
  }

  async findOne(id: number): Promise<Cart> {
    const cart = await this.prisma.cart.findUnique({ where: { id } });
    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }
    return cart;
  }

  async remove(id: number): Promise<Cart> {
    await this.findOne(id);
    return this.prisma.cart.delete({ where: { id } });
  }
}
