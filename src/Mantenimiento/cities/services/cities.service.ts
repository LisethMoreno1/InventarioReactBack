import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { cities } from '../entities/cities.entity';
import { createCitiesDto } from '../Dto/cities-create.dto';
import { updateCitiesDto } from '../Dto/cities-update.dto';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(cities)
    private readonly citiesRepository: Repository<cities>,
  ) {}

  async createCity(CreateCityDto: createCitiesDto): Promise<cities> {
    const city = this.citiesRepository.create(CreateCityDto);
    return this.citiesRepository.save(city);
  }

  async findAllCities(): Promise<cities[]> {
    return this.citiesRepository.find({ relations: ['department'] });
  }

  async findCityById(id: number): Promise<cities> {
    const city = await this.citiesRepository.findOne({
      where: { id },
      relations: ['department'],
    });
    if (!city) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    return city;
  }

  async updateCity(
    id: number,
    UpdateCityDto: updateCitiesDto,
  ): Promise<cities> {
    await this.citiesRepository.update(id, UpdateCityDto);
    const updatedCity = await this.citiesRepository.findOne({
      where: { id },
      relations: ['department'],
    });
    if (!updatedCity) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
    return updatedCity;
  }

  async deleteCity(id: number): Promise<void> {
    const result = await this.citiesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }
  }
}
