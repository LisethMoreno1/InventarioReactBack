import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { department } from '../entities/department.entity';
import { cities } from '../../cities/entities/cities.entity';
import { createDepartmentDto } from '../Dto/create-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(department)
    private readonly departmentsRepository: Repository<department>,
    @InjectRepository(cities)
    private readonly citiesRepository: Repository<cities>,
  ) {}

  async createDepartment(
    createDepartmentDto: createDepartmentDto,
  ): Promise<any> {
    try {
      const newDepartment =
        this.departmentsRepository.create(createDepartmentDto);

      const savedDepartment =
        await this.departmentsRepository.save(newDepartment);

      return savedDepartment;
    } catch (error) {
      console.error('Error en el servicio al crear departamento:', error);
      throw new Error('Error al crear el departamento');
    }
  }

  async findAllDepartments(): Promise<department[]> {
    return this.departmentsRepository.find({ relations: ['cities'] });
  }

  async findDepartmentById(id: number): Promise<department> {
    const department = await this.departmentsRepository.findOne({
      where: { id },
      relations: ['cities'],
    });
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async findCitiesByCityCode(codeCities: string): Promise<cities[]> {
    const cities = await this.citiesRepository.find({
      where: { codeCities: codeCities },
      relations: ['department'],
    });
    if (!cities.length) {
      throw new NotFoundException(`No cities found with code ${codeCities}`);
    }
    return cities;
  }

  async updateDepartment(id: number, name: string): Promise<department> {
    const department = await this.departmentsRepository.findOne({
      where: { id },
    });
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    department.Department = name;
    return this.departmentsRepository.save(department);
  }

  async deleteDepartment(id: number): Promise<void> {
    const result = await this.departmentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
  }
}
