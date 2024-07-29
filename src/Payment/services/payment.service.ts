import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { CreatePaymentDto } from '../dto/payment.dto';
import { OrderStatus } from '../../OrderStatus/Entities/orderStatus.entity';
import { Order } from '../../Orders/Entities/order.entity';
import { Customers } from '../../Customers/Entities/customers.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(OrderStatus)
    private readonly orderStatusRepository: Repository<OrderStatus>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Customers)
    private readonly customersRepository: Repository<Customers>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const orderStatus = await this.orderStatusRepository.findOneBy({ id: createPaymentDto.orderStatusId });
    if (!orderStatus) {
      throw new Error(`OrderStatus with ID ${createPaymentDto.orderStatusId} not found`);
    }

    const order = await this.orderRepository.findOneBy({ id: createPaymentDto.orderId });
    if (!order) {
      throw new Error(`Order with ID ${createPaymentDto.orderId} not found`);
    }

    const customer = await this.customersRepository.findOneBy({ identificationNumber: createPaymentDto.customerIdentificationNumber });
    if (!customer) {
      throw new Error(`Customer with ID ${createPaymentDto.customerIdentificationNumber} not found`);
    }

    const payment = this.paymentRepository.create({
      ...createPaymentDto,
      orderStatus,
      order,
      customer,
    });

    return await this.paymentRepository.save(payment);
  }
  
  async findAll(): Promise<Payment[]> {
    return await this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoinAndSelect('payment.order', 'order')
      .leftJoinAndSelect('payment.customer', 'customer')
      .leftJoinAndSelect('order.orderStatus', 'orderStatus')
      .getMany();
  }

  async findOne(orderNumber: string): Promise<Payment> {
    return await this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoinAndSelect('payment.order', 'order')
      .leftJoinAndSelect('payment.customer', 'customer')
      .leftJoinAndSelect('order.orderStatus', 'orderStatus')
      .where('payment.orderNumber = :orderNumber', { orderNumber })
      .getOne();
  }
  async update(
    orderNumber: string,
    updatePaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    await this.paymentRepository.update(orderNumber, updatePaymentDto);
    return this.findOne(orderNumber);
  }

  async remove(orderNumber: string): Promise<void> {
    await this.paymentRepository.delete(orderNumber);
  }
}
