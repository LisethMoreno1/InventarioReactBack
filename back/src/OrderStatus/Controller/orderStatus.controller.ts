import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrderStatusService } from '../Services/OrderStatus.service';
import { OrderStatus } from '../Entities/orderStatus.entity';
import { CreateOrderStatusDto } from '../Dto/create-OrderStatus.dto';

@ApiTags('Order Status')
@Controller('api/orderStatus')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order status' })
  @ApiResponse({
    status: 201,
    description: 'The order status has been successfully created.',
    type: OrderStatus,
  })
  create(
    @Body() createOrderStatusDto: CreateOrderStatusDto,
  ): Promise<OrderStatus> {
    return this.orderStatusService.create(createOrderStatusDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all order statuses' })
  @ApiResponse({
    status: 200,
    description: 'List of all order statuses.',
    type: [OrderStatus],
  })
  findAll(): Promise<OrderStatus[]> {
    return this.orderStatusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific order status by ID' })
  @ApiResponse({
    status: 200,
    description: 'The order status with the specified ID.',
    type: OrderStatus,
  })
  findOne(@Param('id') id: number): Promise<OrderStatus> {
    return this.orderStatusService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific order status by ID' })
  @ApiResponse({
    status: 204,
    description: 'The order status has been successfully deleted.',
  })
  remove(@Param('id') id: number): Promise<void> {
    return this.orderStatusService.remove(id);
  }
}
