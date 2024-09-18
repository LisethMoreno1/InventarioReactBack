import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateGenderDto } from '../Dto/update-gender.dto';
import { typeOfGender } from '../entities/typeOfGender.entity';

@Injectable()
export class TypeOfGenderService {
  constructor(
    @InjectRepository(typeOfGender)
    private readonly typeOfGenderRepository: Repository<typeOfGender>,
  ) {}

  async findById(genre: string): Promise<typeOfGender> {
    const type = await this.typeOfGenderRepository.findOne({
      where: { genre },
    });
    if (!type) {
      throw new NotFoundException(
        `TypeOfGender con género ${genre} no encontrado`,
      );
    }
    return type;
  }

  async findAll(): Promise<typeOfGender[]> {
    return await this.typeOfGenderRepository.find();
  }

  async create(newTypeOfGender: typeOfGender): Promise<typeOfGender> {
    const createdType = this.typeOfGenderRepository.create(newTypeOfGender);
    return await this.typeOfGenderRepository.save(createdType);
  }

  async updateGender(
    id: number,
    updateDto: UpdateGenderDto,
  ): Promise<typeOfGender> {
    const typeToUpdate = await this.typeOfGenderRepository.findOne({
      where: { id },
    });

    if (!typeToUpdate) {
      throw new NotFoundException(`No se encontró TypeOfGender con ID ${id}`);
    }
    typeToUpdate.genre = updateDto.genre;

    return await this.typeOfGenderRepository.save(typeToUpdate);
  }

  async delete(id: number): Promise<number> {
    const result = await this.typeOfGenderRepository.delete({ id });
    return result.affected || 0;
  }
}
