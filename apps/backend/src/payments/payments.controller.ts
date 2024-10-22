import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentDto } from './dto/payment.dto'; // Importando o DTO
import { ApiTags, ApiResponse, ApiParam, ApiOperation } from '@nestjs/swagger';

@ApiTags('payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 201, description: 'Payment created successfully.', type: PaymentDto })
  @ApiResponse({ status: 400, description: 'Error creating payment.' })
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<PaymentDto> {
    const payment = await this.paymentsService.create(createPaymentDto);
    return payment; // Retorna o DTO do pagamento criado
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all payments' })
  @ApiResponse({ status: 200, description: 'List of payments retrieved successfully.', type: [PaymentDto] })
  async findAll(): Promise<PaymentDto[]> {
    const payments = await this.paymentsService.findAll();
    return payments; // Retorna a lista de pagamentos
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the payment' })
  @ApiOperation({ summary: 'Retrieve a payment by ID' })
  @ApiResponse({ status: 200, description: 'Payment found.', type: PaymentDto })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  async findOne(@Param('id') id: string): Promise<PaymentDto> {
    const payment = await this.paymentsService.findOne(+id);
    return payment; // Retorna o DTO do pagamento encontrado
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true, description: 'ID of the payment to be removed' })
  @ApiOperation({ summary: 'Delete a payment by ID' })
  @ApiResponse({ status: 200, description: 'Payment removed successfully.', type: PaymentDto })
  @ApiResponse({ status: 404, description: 'Payment not found.' })
  async remove(@Param('id') id: string): Promise<PaymentDto> {
    const payment = await this.paymentsService.remove(+id);
    return payment; // Retorna o DTO do pagamento removido
  }
}
  