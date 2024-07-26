import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBankDto } from '../dto/bank.dto';
import { Bank } from '../entities/bank.entity';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private readonly bankRepository: Repository<Bank>,
  ) {}

  async create(createBankDto: CreateBankDto): Promise<Bank> {
    const bank = this.bankRepository.create(createBankDto);
    return this.bankRepository.save(bank);
  }

  async findAll(): Promise<Bank[]> {
    return this.bankRepository.find();
  }

  async findOne(id: number): Promise<Bank> {
    const bank = await this.bankRepository.findOneBy({ id });
    if (!bank) {
      throw new NotFoundException(`Bank with ID ${id} not found`);
    }
    return bank;
  }

  async update(id: number, updateBankDto: CreateBankDto): Promise<Bank> {
    const bank = await this.findOne(id);
    Object.assign(bank, updateBankDto);
    return this.bankRepository.save(bank);
  }

  async remove(id: number): Promise<void> {
    const result = await this.bankRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Bank with ID ${id} not found`);
    }
  }
}
