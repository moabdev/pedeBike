import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
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
  @ApiResponse({ status: 201, description: 'Cart created successfully.', type: CartDto })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  async create(@Body() createCartDto: CreateCartDto): Promise<CartDto> {
    const cart = await this.cartsService.create(createCartDto);
    return cart;
  }

  @Get()
  @ApiOperation({ summary: 'Get all carts' })
  @ApiResponse({ status: 200, description: 'List of carts returned.', type: [CartDto] })
  async findAll(): Promise<CartDto[]> {
    const carts = await this.cartsService.findAll();
    return carts;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a cart by ID' })
  @ApiResponse({ status: 200, description: 'Cart found.', type: CartDto })
  @ApiResponse({ status: 404, description: 'Cart not found.' })
  async findOne(@Param('id') id: string): Promise<CartDto> {
    const cart = await this.cartsService.findOne(Number(id));
    return cart;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a cart by ID' })
  @ApiResponse({ status: 200, description: 'Cart removed successfully.', type: CartDto })
  @ApiResponse({ status: 404, description: 'Cart not found.' })
  async remove(@Param('id') id: string): Promise<CartDto> {
    const cart = await this.cartsService.remove(Number(id));
    return cart;
  }
}
