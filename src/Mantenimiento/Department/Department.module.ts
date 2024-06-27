import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { department } from './entities/department.entity';
import { DepartmentService } from './services/department.service';

@Module({
  imports: [TypeOrmModule.forFeature([department])],
  providers: [DepartmentService],
  controllers: [],
  exports: [DepartmentService],
})
export class DepartmentModule {}
