import { Injectable, NotFoundException } from '@nestjs/common';
import { CartItem } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';

@Injectable()
export class CartItemsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCartItemDto): Promise<CartItem> {
    return this.prisma.cartItem.create({ data });
  }

  async findAll(): Promise<CartItem[]> {
    return this.prisma.cartItem.findMany();
  }

  async findOne(id: number): Promise<CartItem> {
    const cartItem = await this.prisma.cartItem.findUnique({ where: { id } });
    if (!cartItem) {
      throw new NotFoundException(`CartItem with ID ${id} not found`);
    }
    return cartItem;
  }

  async remove(id: number): Promise<CartItem> {
    await this.findOne(id);
    return this.prisma.cartItem.delete({ where: { id } });
  }
}
