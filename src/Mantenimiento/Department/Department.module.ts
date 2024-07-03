import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { department } from './entities/department.entity';
import { cities } from '../cities/entities/cities.entity';
import { DepartmentsService } from './services/department.service';
import { DepartmentsController } from './controllers/department.controller';

@Module({
  imports: [TypeOrmModule.forFeature([department, cities])],
  providers: [DepartmentsService],
  controllers: [DepartmentsController],
  exports: [DepartmentsService],
})
export class DepartmentModule {}
