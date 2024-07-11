import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Customers } from '../../Customers/Entities/customers.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Customers)
    private customerRepository: Repository<Customers>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customer_id, total } = createOrderDto;

    // Fetch the customer based on the provided customer_id
    const customer = await this.customerRepository.findOne({
      where: { id: customer_id },
    });

    // If no customer found, throw a NotFoundException
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customer_id} not found`);
    }

    // Create a new Order instance and assign the customer and total
    const newOrder = new Order();
    newOrder.customer = customer;
    newOrder.total = total;

    // Save the new order in the database and return the created order
    return await this.orderRepository.save(newOrder);
  }

  async findAll(): Promise<Order[]> {
    // Find all orders and include the 'customer' relation
    return await this.orderRepository.find({ relations: ['customer'] });
  }

  async findOne(id: number): Promise<Order | undefined> {
    // Find an order by its ID and include the 'customer' relation
    return await this.orderRepository.findOne({
      where: { id },
      relations: ['customer'],
    });
  }

  async findByCustomerId(customerId: number): Promise<Order[]> {
    // Find all orders belonging to a specific customer ID and include the 'customer' relation
    return await this.orderRepository.find({
      where: { customer: { id: customerId } },
      relations: ['customer'],
    });
  }

  async remove(id: number): Promise<void> {
    // Find an order by its ID
    const order = await this.orderRepository.findOne({ where: { id } });

    // If no order found, throw a NotFoundException
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    // Remove the order from the database
    await this.orderRepository.remove(order);
  }
}
