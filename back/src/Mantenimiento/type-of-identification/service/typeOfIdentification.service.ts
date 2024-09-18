import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const { name } = newType;
    const existingType = await this.typeOfIdentificationRepository.findOne({
      where: { name },
    });
    if (existingType) {
      throw new ConflictException(
        `El tipo de identificación '${name}' ya existe.`,
      );
    }
    return this.typeOfIdentificationRepository.save(newType);
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

  async delete(id: number): Promise<boolean> {
    const result = await this.typeOfIdentificationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `TypeOfIdentification with ID ${id} not found`,
      );
    }
    return true;
  }
}
