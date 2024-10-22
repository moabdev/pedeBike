import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartDto } from './dto/cart.dto';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCartDto: CreateCartDto): Promise<CartDto> {
    const cart = await this.prisma.cart.create({
      data: {
        userId: createCartDto.userId,
      },
      include: {
        items: {
          include: { bike: true },
        },
      },
    });

    return this.mapToDto(cart);
  }

  async findAll(): Promise<CartDto[]> {
    const carts = await this.prisma.cart.findMany({
      include: {
        items: {
          include: { bike: true },
        },
      },
    });

    return carts.map(cart => this.mapToDto(cart));
  }

  async findOne(id: number): Promise<CartDto> {
    const cart = await this.prisma.cart.findUnique({
      where: { id },
      include: {
        items: {
          include: { bike: true },
        },
      },
    });

    if (!cart) {
      throw new NotFoundException(`Cart with ID ${id} not found`);
    }

    return this.mapToDto(cart);
  }

  async remove(id: number): Promise<CartDto> {
    const cart = await this.prisma.cart.delete({
      where: { id },
      include: {
        items: {
          include: { bike: true }, 
        },
      },
    });

    return this.mapToDto(cart);
  }

  private mapToDto(cart: any): CartDto {
    return {
      id: cart.id,
      userId: cart.userId,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
      items: cart.items.map(item => ({
        id: item.id,
        cartId: item.cartId,
        bikeId: item.bikeId,
        quantity: item.quantity,
        hours: item.hours,
        bike: item.bike,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
    };
  }
}
