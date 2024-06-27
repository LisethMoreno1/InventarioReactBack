import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { department } from '../entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(department)
    private readonly DepartmentRepository: Repository<department>,
  ) {}

  async findById(Department: string): Promise<department> {
    const type = await this.DepartmentRepository.findOne({
      where: { Department },
    });
    if (!type) {
      throw new NotFoundException(`Department with  ${Department} not found`);
    }
    return type;
  }
}
