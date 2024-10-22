import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importando os decorators do Swagger
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { Cart } from '@prisma/client'; // Importando o modelo de Cart

@ApiTags('carts') // Agrupando as rotas sob a tag 'carts' na documentação
@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo carrinho' }) // Descrição da operação
  @ApiResponse({ status: 201, description: 'Carrinho criado com sucesso.' }) // Resposta de sucesso
  @ApiResponse({ status: 400, description: 'Requisição inválida.' }) // Resposta de erro
  async create(@Body() createCartDto: CreateCartDto): Promise<Cart> {
    return this.cartsService.create(createCartDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os carrinhos' }) // Descrição da operação
  @ApiResponse({ status: 200, description: 'Lista de carrinhos retornada.' }) // Resposta de sucesso
  async findAll(): Promise<Cart[]> {
    return this.cartsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um carrinho pelo ID' }) // Descrição da operação
  @ApiResponse({ status: 200, description: 'Carrinho encontrado.' }) // Resposta de sucesso
  @ApiResponse({ status: 404, description: 'Carrinho não encontrado.' }) // Resposta de erro
  async findOne(@Param('id') id: string): Promise<Cart> {
    return this.cartsService.findOne(Number(id));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um carrinho pelo ID' }) // Descrição da operação
  @ApiResponse({ status: 200, description: 'Carrinho removido com sucesso.' }) // Resposta de sucesso
  @ApiResponse({ status: 404, description: 'Carrinho não encontrado.' }) // Resposta de erro
  async remove(@Param('id') id: string): Promise<Cart> {
    return this.cartsService.remove(Number(id));
  }
}
