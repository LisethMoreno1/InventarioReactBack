import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOfIdentification } from '../entities/TypeOfIdentification.entity';

@Injectable()
export class TypeOfIdentificationService {
  constructor(
    @InjectRepository(TypeOfIdentification)
    private readonly typeOfIdentificationRepository: Repository<TypeOfIdentification>,
  ) {}

  async findAll(): Promise<TypeOfIdentification[]> {
    return await this.typeOfIdentificationRepository.find();
  }

  async findById(id: number): Promise<TypeOfIdentification> {
    const type = await this.typeOfIdentificationRepository.findOne({
      where: { id },
    });
    if (!type) {
      throw new NotFoundException(
        `TypeOfIdentification con ID ${id} no encontrado`,
      );
    }
    return type;
  }

  async create(newType: TypeOfIdentification): Promise<TypeOfIdentification> {
    const createdType = this.typeOfIdentificationRepository.create(newType);
    return await this.typeOfIdentificationRepository.save(createdType);
  }

  async update(
    id: number,
    updatedType: TypeOfIdentification,
  ): Promise<TypeOfIdentification> {
    const type = await this.typeOfIdentificationRepository.findOne({
      where: { id },
    });
    if (!type) {
      throw new NotFoundException(
        `TypeOfIdentification con ID ${id} no encontrado`,
      );
    }

    await this.typeOfIdentificationRepository.update({ id }, updatedType);
    return await this.typeOfIdentificationRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<number> {
    const result = await this.typeOfIdentificationRepository.delete({ id });
    return result.affected || 0;
  }
}
