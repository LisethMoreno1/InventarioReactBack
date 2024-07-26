import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOfAddress } from '../entities/typeOfAddress.entity';
import { CreateTypeOfAddressDto } from '../dto/typeOfAddress.dto';

@Injectable()
export class TypeOfAddressService {
  constructor(
    @InjectRepository(TypeOfAddress)
    private readonly typeOfAddressRepository: Repository<TypeOfAddress>,
  ) {}

  async create(
    createTypeOfAddressDto: CreateTypeOfAddressDto,
  ): Promise<TypeOfAddress> {
    const typeOfAddress = this.typeOfAddressRepository.create(
      createTypeOfAddressDto,
    );
    return this.typeOfAddressRepository.save(typeOfAddress);
  }

  async findAll(): Promise<TypeOfAddress[]> {
    return this.typeOfAddressRepository.find();
  }

  async findOne(id: number): Promise<TypeOfAddress> {
    return this.typeOfAddressRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateTypeOfAddressDto: CreateTypeOfAddressDto,
  ): Promise<TypeOfAddress> {
    await this.typeOfAddressRepository.update(id, updateTypeOfAddressDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.typeOfAddressRepository.delete(id);
  }
}
