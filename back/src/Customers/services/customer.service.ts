import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    return this.customersRepository
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.orders', 'orders')
      .where('customer.identificationNumber = :identificationNumber', {
        identificationNumber,
      })
      .getOne();
  }

  async findOne(
    identificationNumber: number | string,
  ): Promise<Customers | undefined> {
    return this.customersRepository
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
    const { identificationNumber, order } = customerData;
  
   // Comprueba si el cliente ya existe
    const existingCustomer = await this.customersRepository.findOne({
      where: { identificationNumber },
    });
  
    if (existingCustomer) {
      throw new ConflictException(
        'Este número de identificación ya está registrado.',
      );
    }
  
    // Crear un nuevo cliente
    const newCustomer = this.customersRepository.create(customerData);
  
    try {
      return await this.customersRepository.manager.transaction(
        async (transactionalEntityManager) => {
          const customer = await transactionalEntityManager.save(
            Customers,
            newCustomer,
          );
  
          if (order) {
            const orderNumber = await this.generateOrderNumber();
            const newOrder = this.orderRepository.create({
              ...order,
              entryDate: new Date(),
              customer,
              orderNumber,
            });
            await transactionalEntityManager.save(Order, newOrder);
          }
  
          return customer;
        },
      );
    } catch (error) {
 
      throw new ConflictException(
        `Error al crear cliente y orden: ${error.message}`,
      );
    }
  }
  
  //Genera un número de orden único utilizando la marca de tiempo actual
  private generateOrderNumber(): string {
    return `ORD-${Date.now()}`;
  }

  async update(
    id: number,
    customerData: Partial<Customers>,
  ): Promise<Customers> {
    const customer = await this.customersRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado.`);
    }

    await this.customersRepository.update(id, customerData);
    return this.customersRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const customer = await this.customersRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Cliente con ID ${id} no encontrado.`);
    }

    await this.customersRepository.delete(id);
  }
}
