import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from '../../Customers/services/customer.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly customersService: CustomersService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    // Busca el cliente por su número de identificación

    const customer = await this.customersService.findById(
      createOrderDto.customerIdentificationNumber,
    );
    if (!customer) {
      throw new NotFoundException(
        `Cliente con ID ${createOrderDto.customerIdentificationNumber} no encontrado.`,
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

  async findOne(id: number): Promise<Order | undefined> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['customer'],
    });
  }
}
