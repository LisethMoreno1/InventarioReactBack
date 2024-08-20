import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { OrderDetailsE } from '../entities/orderDetails.entity';
import { CreateOrderDetailsDto } from '../dto/create-OrderDetails-dto';
import { OrderDetailsService } from '../services/orderDetails.service';
import { ApiTags, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Order Details')
@Controller('api/order-details')
export class OrderDetailsController {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Post()
  @ApiBody({ type: CreateOrderDetailsDto })
  async create(
    @Body() createOrderDetailsDto: CreateOrderDetailsDto,
  ): Promise<OrderDetailsE> {
    return this.orderDetailsService.create(createOrderDetailsDto);
  }

  @Get()
  async findAll(): Promise<OrderDetailsE[]> {
    return this.orderDetailsService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id') id: number): Promise<OrderDetailsE> {
    return this.orderDetailsService.findOne(id);
  }
}
