import { Injectable, NotFoundException } from '@nestjs/common';
import { CartItem } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItemDto } from './dto/cart-item.dto';

@Injectable()
export class CartItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCartItemDto: CreateCartItemDto): Promise<CartItemDto> {
    const cartItem = await this.prisma.cartItem.create({
      data: createCartItemDto,
    });
    return this.mapToDto(cartItem);
  }

  async findOne(id: number): Promise<CartItemDto> {
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id },
    });

    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID ${id} not found`);
    }

    return this.mapToDto(cartItem);
  }

  private mapToDto(cartItem: CartItem): CartItemDto {
    return {
      id: cartItem.id,
      cartId: cartItem.cartId,
      bikeId: cartItem.bikeId,
      quantity: cartItem.quantity,
      hours: cartItem.hours,
      createdAt: cartItem.createdAt,
      updatedAt: cartItem.updatedAt,
    };
  }
}
