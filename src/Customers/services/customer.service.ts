import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../Orders/Entities/order.entity';
import { CreateCustomerDto } from '../Dto/create.customers.dto';
import { Customers } from '../Entities/customers.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customers)
    private readonly customersRepository: Repository<Customers>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Customers[]> {
    return this.customersRepository.find({
      relations: ['typeOfIdentification', 'orders'],
    });
  }

  async findById(
    identificationNumber: number | string,
  ): Promise<Customers | undefined> {
    // Encuentra un cliente por su número de identificación, cargando las órdenes relacionadas

    return this.customersRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.orders', 'orders')
      .where('customer.identificationNumber = :identificationNumber', {
        identificationNumber,
      })
      .getOne();
  }

  async findOne(
    identificationNumber: string | number,
  ): Promise<Customers | undefined> {
    return await this.customersRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect(
        'customer.typeOfIdentification',
        'typeOfIdentification',
      )
      .leftJoinAndSelect('customer.orders', 'orders')
      .where('customer.identificationNumber = :identificationNumber', {
        identificationNumber,
      })
      .getOne();
  }

  async create(customerData: CreateCustomerDto): Promise<Customers> {
    const { identificationNumber } = customerData;

    // Verificar si ya existe un cliente con ese número de identificación
    const existingCustomer = await this.customersRepository.findOne({
      where: { identificationNumber },
    });

    if (existingCustomer) {
      throw new Error('Este número de identificación ya está registrado.');
    }

    const newCustomer = new Customers();
    newCustomer.typeOfIdentification = customerData.typeOfIdentification;
    newCustomer.identificationNumber = customerData.identificationNumber;
    newCustomer.name = customerData.name;
    newCustomer.phone = customerData.phone;
    newCustomer.email = customerData.email;
    newCustomer.address = customerData.address;

    const customer = await this.customersRepository.save(newCustomer);

    if (customerData.order) {
      const order = new Order();
      order.price = customerData.order.price;
      order.entryDate = new Date();
      order.customer = customer;
      await this.orderRepository.save(order);
    }

    return customer;
  }

  async update(
    id: number,
    customerData: Partial<Customers>,
  ): Promise<Customers> {
    await this.customersRepository.update(id, customerData);
    return this.customersRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.customersRepository.delete(id);
  }
}
