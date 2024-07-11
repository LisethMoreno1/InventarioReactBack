import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customers } from '../Entities/customers.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customers)
    private customersRepository: Repository<Customers>,
  ) {}

  async findAll(): Promise<Customers[]> {
    return await this.customersRepository.find({
      relations: ['typeOfIdentification'],
    });
  }

  async findOne(identificationNumber: number): Promise<Customers | undefined> {
    return await this.customersRepository
      .createQueryBuilder('Customers')
      .leftJoinAndSelect(
        'Customers.typeOfIdentification',
        'typeOfIdentification',
      )
      .where('Customers.identificationNumber = :identificationNumber', {
        identificationNumber,
      })
      .getOne();
  }

  async create(customerData: Customers): Promise<Customers> {
    const newCustomer = this.customersRepository.create(customerData);
    return await this.customersRepository.save(newCustomer);
  }

  async update(id: number, customerData: Customers): Promise<Customers> {
    const customer = await this.findOne(id);
    this.customersRepository.merge(customer, customerData);
    return await this.customersRepository.save(customer);
  }

  async delete(id: number): Promise<void> {
    const customer = await this.findOne(id);
    await this.customersRepository.delete(customer);
  }
}
