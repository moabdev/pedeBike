import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Importando os decorators do Swagger
import { BikesService } from './bikes.service';
import { CreateBikeDto } from './dto/create-bike.dto';
import { UpdateBikeDto } from './dto/update-bike.dto';
import { Bike } from '@prisma/client'; // Importando o modelo de Bike

@ApiTags('bikes') // Agrupando as rotas sob a tag 'bikes' na documentação
@Controller('bikes')
export class BikesController {
  constructor(private readonly bikesService: BikesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova bicicleta' }) // Descrição da operação
  @ApiResponse({ status: 201, description: 'Bicicleta criada com sucesso.' }) // Resposta de sucesso
  @ApiResponse({ status: 400, description: 'Requisição inválida.' }) // Resposta de erro
  create(@Body() createBikeDto: CreateBikeDto): Promise<Bike> {
    return this.bikesService.create(createBikeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todas as bicicletas' }) // Descrição da operação
  @ApiResponse({ status: 200, description: 'Lista de bicicletas retornada.' }) // Resposta de sucesso
  findAll(): Promise<Bike[]> {
    return this.bikesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma bicicleta pelo ID' }) // Descrição da operação
  @ApiResponse({ status: 200, description: 'Bicicleta encontrada.' }) // Resposta de sucesso
  @ApiResponse({ status: 404, description: 'Bicicleta não encontrada.' }) // Resposta de erro
  findOne(@Param('id') id: string): Promise<Bike> {
    return this.bikesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma bicicleta pelo ID' }) // Descrição da operação
  @ApiResponse({ status: 200, description: 'Bicicleta atualizada com sucesso.' }) // Resposta de sucesso
  @ApiResponse({ status: 404, description: 'Bicicleta não encontrada.' }) // Resposta de erro
  update(@Param('id') id: string, @Body() updateBikeDto: UpdateBikeDto): Promise<Bike> {
    return this.bikesService.update(+id, updateBikeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma bicicleta pelo ID' }) // Descrição da operação
  @ApiResponse({ status: 200, description: 'Bicicleta removida com sucesso.' }) // Resposta de sucesso
  @ApiResponse({ status: 404, description: 'Bicicleta não encontrada.' }) // Resposta de erro
  remove(@Param('id') id: string): Promise<Bike> {
    return this.bikesService.remove(+id);
  }
}
