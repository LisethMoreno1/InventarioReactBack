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

  async findById(id: number): Promise<TypeOfIdentification> {
    const type = await this.typeOfIdentificationRepository.findOne({
      where: { id },
    });
    if (!type) {
      throw new NotFoundException(
        `TypeOfIdentification with ID ${id} not found`,
      );
    }
    return type;
  }
}
