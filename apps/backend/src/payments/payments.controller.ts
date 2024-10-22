import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentDto } from './dto/payment.dto'; // Importando o DTO
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Pagamento criado com sucesso.', type: PaymentDto })
  @ApiResponse({ status: 400, description: 'Erro na criação do pagamento.' })
  create(@Body() createPaymentDto: CreatePaymentDto): Promise<PaymentDto> {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de pagamentos retornada com sucesso.', type: [PaymentDto] })
  findAll(): Promise<PaymentDto[]> {
    return this.paymentsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID do pagamento' })
  @ApiResponse({ status: 200, description: 'Pagamento encontrado.', type: PaymentDto })
  @ApiResponse({ status: 404, description: 'Pagamento não encontrado.' })
  findOne(@Param('id') id: string): Promise<PaymentDto> {
    return this.paymentsService.findOne(+id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID do pagamento a ser removido' })
  @ApiResponse({ status: 200, description: 'Pagamento removido com sucesso.', type: PaymentDto })
  @ApiResponse({ status: 404, description: 'Pagamento não encontrado.' })
  remove(@Param('id') id: string): Promise<PaymentDto> {
    return this.paymentsService.remove(+id);
  }
}
