import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from '../entities/payment.entity';
import { CreatePaymentDto } from '../dto/payment.dto';
import { OrderStatus } from '../../OrderStatus/Entities/orderStatus.entity';
import { Order } from '../../Orders/Entities/order.entity';
import { Customers } from '../../Customers/Entities/customers.entity';
import { Bank } from '../../Mantenimiento/bank/entities/bank.entity';

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

    @InjectRepository(Bank)
    private readonly bankRepository: Repository<Bank>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const order = await this.orderRepository.findOne({
      where: { id: createPaymentDto.orderId },
    });
    if (!order) {
      throw new NotFoundException(
        `Order with ID ${createPaymentDto.orderId} not found`,
      );
    }

    const customer = await this.customersRepository.findOne({
      where: {
        identificationNumber: createPaymentDto.customerIdentificationNumber,
      },
    });
    if (!customer) {
      throw new NotFoundException(
        `Customer with ID ${createPaymentDto.customerIdentificationNumber} not found`,
      );
    }

    const payment = this.paymentRepository.create({
      ...createPaymentDto,
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
      .leftJoinAndSelect('payment.bank', 'bank')
      .getMany();
  }

  async findOne(orderNumber: string): Promise<Payment> {
    const payment = await this.paymentRepository
      .createQueryBuilder('payment')
      .leftJoinAndSelect('payment.order', 'order')
      .leftJoinAndSelect('payment.customer', 'customer')
      .leftJoinAndSelect('payment.bank', 'bank')
      .where('payment.orderNumber = :orderNumber', { orderNumber })
      .getOne();

    if (!payment) {
      throw new NotFoundException(
        `Payment with order number ${orderNumber} not found`,
      );
    }

    return payment;
  }

  async update(
    orderNumber: string,
    updatePaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    const payment = await this.findOne(orderNumber);
    await this.paymentRepository.update(payment.id, updatePaymentDto);
    return this.findOne(orderNumber);
  }

  async remove(orderNumber: string): Promise<void> {
    const payment = await this.findOne(orderNumber);
    await this.paymentRepository.delete(payment.id);
  }
}
