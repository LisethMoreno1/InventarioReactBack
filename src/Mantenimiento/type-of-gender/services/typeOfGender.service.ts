import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
      throw new NotFoundException(`TypeOfGender with genre ${genre} not found`);
    }
    return type;
  }
}
