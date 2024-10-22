import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart, CartItem } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartDto } from './dto/cart.dto';

interface CartWithItems extends Cart {
  items: CartItem[];
}

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCartDto: CreateCartDto): Promise<CartDto> {
    const cart = await this.prisma.cart.create({
      data: {
        userId: createCartDto.userId,
      },
    }) as CartWithItems;
    return this.mapToDto(cart);
  }

  async findOne(id: number): Promise<CartDto> {
    const cart = await this.prisma.cart.findUnique({
      where: { id },
      include: { items: true },
    }) as CartWithItems;

    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }

    return this.mapToDto(cart);
  }

  private mapToDto(cart: CartWithItems): CartDto {
    return {
      id: cart.id,
      userId: cart.userId,
      items: cart.items,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    };
  }
}
