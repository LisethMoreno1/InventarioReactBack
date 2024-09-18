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
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Returns a list of orders.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAll(): Promise<Order[]> {
    return this.ordersService.findAllOrders();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Returns the order with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'Order not found.' })
  async findOne(@Param('id') id: number): Promise<Order> {
    const order = await this.ordersService.findOne(id);
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found.`);
    }
    return order;
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.createOrder(createOrderDto);
  }
}
