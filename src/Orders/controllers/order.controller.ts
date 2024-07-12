import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';
import { OrdersService } from '../services/order.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAllOrders();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Order> {
    const order = await this.ordersService.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
    return order;
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }
}
