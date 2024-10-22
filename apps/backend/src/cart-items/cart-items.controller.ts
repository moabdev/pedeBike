import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importando os decorators do Swagger
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { CartItem } from '@prisma/client'; // Importando o modelo de CartItem

@ApiTags('cart-items') // Agrupando as rotas sob a tag 'cart-items' na documentação
@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo item no carrinho' }) // Descrição da operação
  @ApiResponse({ status: 201, description: 'Item do carrinho criado com sucesso.' }) // Resposta de sucesso
  @ApiResponse({ status: 400, description: 'Requisição inválida.' }) // Resposta de erro
  async create(@Body() createCartItemDto: CreateCartItemDto): Promise<CartItem> {
    return this.cartItemsService.create(createCartItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os itens do carrinho' }) // Descrição da operação
  @ApiResponse({ status: 200, description: 'Lista de itens do carrinho retornada.' }) // Resposta de sucesso
  async findAll(): Promise<CartItem[]> {
    return this.cartItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um item do carrinho pelo ID' }) // Descrição da operação
  @ApiResponse({ status: 200, description: 'Item do carrinho encontrado.' }) // Resposta de sucesso
  @ApiResponse({ status: 404, description: 'Item do carrinho não encontrado.' }) // Resposta de erro
  async findOne(@Param('id') id: string): Promise<CartItem> {
    return this.cartItemsService.findOne(Number(id));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um item do carrinho pelo ID' }) // Descrição da operação
  @ApiResponse({ status: 200, description: 'Item do carrinho removido com sucesso.' }) // Resposta de sucesso
  @ApiResponse({ status: 404, description: 'Item do carrinho não encontrado.' }) // Resposta de erro
  async remove(@Param('id') id: string): Promise<CartItem> {
    return this.cartItemsService.remove(Number(id));
  }
}
