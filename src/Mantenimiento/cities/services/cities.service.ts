import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { cities } from '../entities/cities.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(cities)
    private readonly CitiesRepository: Repository<cities>,
  ) {}

  async findById(cities: string): Promise<cities> {
    const type = await this.CitiesRepository.findOne({
      where: { cities },
    });
    if (!type) {
      throw new NotFoundException(`cities with  ${cities} not found`);
    }
    return type;
  }
}
