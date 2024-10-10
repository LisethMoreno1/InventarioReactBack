import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ValidationPipe,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DepartmentsService } from '../services/department.service';
import { createDepartmentDto } from '../Dto/create-department.dto';
import { department } from '../entities/department.entity';
import { cities } from '../../cities/entities/cities.entity';

@ApiTags('Departments')
@Controller('api/departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  async createDepartment(
    @Body(new ValidationPipe()) CreateDepartmentDto: createDepartmentDto,
  ): Promise<any> {
    try {
      return await this.departmentsService.createDepartment(
        CreateDepartmentDto,
      );
    } catch (error) {
      console.error('Error en el controlador al crear departamento:', error);
      throw new InternalServerErrorException(
        `Error al crear el departamento: ${error.message}`,
      );
    }
  }

  @Get()
  async findAllDepartments(): Promise<department[]> {
    return this.departmentsService.findAllDepartments();
  }

  @Get(':id')
  async findDepartmentById(@Param('id') id: number): Promise<department> {
    return this.departmentsService.findDepartmentById(id);
  }

  @Get('/cities/:code')
  async findCitiesByCityCode(@Param('code') code: string): Promise<cities[]> {
    return this.departmentsService.findCitiesByCityCode(code);
  }

  @Put(':id')
  async updateDepartment(
    @Param('id') id: number,
    @Body('name') name: string,
  ): Promise<department> {
    return this.departmentsService.updateDepartment(id, name);
  }

  @Delete(':id')
  async deleteDepartment(@Param('id') id: number): Promise<void> {
    return this.departmentsService.deleteDepartment(id);
  }
}
