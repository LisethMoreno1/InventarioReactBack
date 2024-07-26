import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeOfCurrencyDto } from '../dto/typeOfcurrency.dto';
import { TypeOfCurrency } from '../entities/typeOfcurrency.entity';

@Injectable()
export class TypeOfCurrencyService {
  constructor(
    @InjectRepository(TypeOfCurrency)
    private readonly typeOfCurrencyRepository: Repository<TypeOfCurrency>,
  ) {}

  async create(dto: CreateTypeOfCurrencyDto): Promise<TypeOfCurrency> {
    const typeOfCurrency = this.typeOfCurrencyRepository.create(dto);
    return await this.typeOfCurrencyRepository.save(typeOfCurrency);
  }

  async findAll(): Promise<TypeOfCurrency[]> {
    return await this.typeOfCurrencyRepository.find();
  }

  async findOne(id: number): Promise<TypeOfCurrency> {
    return await this.typeOfCurrencyRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.typeOfCurrencyRepository.delete(id);
  }
}
