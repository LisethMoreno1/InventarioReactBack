import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { CustomersService } from '../../Customers/services/customer.service';
import { CreateOrderDto } from '../Dto/create-order.dto';
import { Order } from '../Entities/order.entity';
import { OrdersService } from '../services/order.service';
import { ApiTags } from '@nestjs/swagger';

ApiTags('Orders');
@Controller('api/orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly customersService: CustomersService,
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    const customer = await this.customersService.findById(
      createOrderDto.customerId,
    );
    if (!customer) {
      throw new NotFoundException(
        `Customer with ID ${createOrderDto.customerId} not found.`,
      );
    }

    return this.ordersService.createOrder(createOrderDto);
  }

  @Get()
  async findAllOrders(): Promise<Order[]> {
    return this.ordersService.findAllOrders();
  }
}
