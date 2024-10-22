import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItemDto } from './dto/cart-item.dto';
import { CartItem } from '@prisma/client';

@ApiTags('cart-items')
@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cart item' })
  @ApiResponse({ status: 201, description: 'Cart item created successfully.', type: CartItemDto })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  async create(@Body() createCartItemDto: CreateCartItemDto): Promise<CartItemDto> {
    const cartItem = await this.cartItemsService.create(createCartItemDto);
    
    return this.mapToDto(cartItem);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cart items' })
  @ApiResponse({ status: 200, description: 'List of cart items returned.', type: [CartItemDto] })
  async findAll(): Promise<CartItemDto[]> {
    const cartItems = await this.cartItemsService.findAll();
    return cartItems.map(item => this.mapToDto(item));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cart item by ID' })
  @ApiResponse({ status: 200, description: 'Cart item found.', type: CartItemDto })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  async findOne(@Param('id') id: string): Promise<CartItemDto> {
    const cartItem = await this.cartItemsService.findOne(Number(id));
    return this.mapToDto(cartItem);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a cart item by ID' })
  @ApiResponse({ status: 200, description: 'Cart item removed successfully.', type: CartItemDto })
  @ApiResponse({ status: 404, description: 'Cart item not found.' })
  async remove(@Param('id') id: string): Promise<CartItemDto> {
    const cartItem = await this.cartItemsService.remove(Number(id));
    return this.mapToDto(cartItem);
  }

  private mapToDto(cartItem: CartItem): CartItemDto {
    return {
      ...cartItem,
      productId: cartItem.bikeId,
      bike: undefined, 
    };
  }
}
