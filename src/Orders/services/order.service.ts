import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../Entities/order.entity';
import { CustomersService } from '../../Customers/services/customer.service';
import { CreateOrderDto } from '../Dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly customersService: CustomersService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const customer = await this.customersService.findById(
      createOrderDto.customerId,
    );
    if (!customer) {
      throw new NotFoundException(
        `Customer with ID ${createOrderDto.customerId} not found.`,
      );
    }

    const newOrder = new Order();
    newOrder.price = createOrderDto.price;
    newOrder.entryDate = createOrderDto.entryDate;
    newOrder.customer = customer;

    return this.orderRepository.save(newOrder);
  }

  async findAllOrders(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['customer'] });
  }
}
