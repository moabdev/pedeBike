import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartDto } from './dto/cart.dto';

@ApiTags('carts')
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new cart' })
  @ApiResponse({ status: 201, description: 'Cart created successfully', type: CartDto })
  async create(@Body() createCartDto: CreateCartDto): Promise<CartDto> {
    return this.cartsService.create(createCartDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get cart by ID' })
  @ApiResponse({ status: 200, description: 'Cart found', type: CartDto })
  @ApiResponse({ status: 404, description: 'Cart not found' })
  async findOne(@Param('id') id: string): Promise<CartDto> {
    return this.cartsService.findOne(Number(id));
  }
}
