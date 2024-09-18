import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CitiesService } from '../services/cities.service';
import { cities } from '../entities/cities.entity';
import { createCitiesDto } from '../Dto/cities-create.dto';
import { updateCitiesDto } from '../Dto/cities-update.dto';

@ApiTags('Cities')
@Controller('api/cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  // Create a new city
  @Post()
  async createCity(@Body() createCityDto: createCitiesDto): Promise<cities> {
    return this.citiesService.createCity(createCityDto);
  }

  // Get all cities
  @Get()
  async findAllCities(): Promise<cities[]> {
    return this.citiesService.findAllCities();
  }

  // Get a city by ID
  @Get(':id')
  async findCityById(@Param('id') id: number): Promise<cities> {
    return this.citiesService.findCityById(id);
  }

  // Update a city
  @Put(':id')
  async updateCity(
    @Param('id') id: number,
    @Body() UpdateCityDto: updateCitiesDto,
  ): Promise<cities> {
    return this.citiesService.updateCity(id, UpdateCityDto);
  }

  // Delete a city
  @Delete(':id')
  async deleteCity(@Param('id') id: number): Promise<void> {
    return this.citiesService.deleteCity(id);
  }
}
