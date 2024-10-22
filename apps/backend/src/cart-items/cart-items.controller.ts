import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItemDto } from './dto/cart-item.dto';

@ApiTags('cart-items')
@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Add a new item to the cart' })
  @ApiResponse({ status: 201, description: 'Cart item created successfully', type: CartItemDto })
  async create(@Body() createCartItemDto: CreateCartItemDto): Promise<CartItemDto> {
    return this.cartItemsService.create(createCartItemDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cart item by ID' })
  @ApiResponse({ status: 200, description: 'Cart item found', type: CartItemDto })
  @ApiResponse({ status: 404, description: 'Cart item not found' })
  async findOne(@Param('id') id: string): Promise<CartItemDto> {
    return this.cartItemsService.findOne(Number(id));
  }
}
