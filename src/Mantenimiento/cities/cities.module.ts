import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { cities } from './entities/cities.entity';
import { CitiesService } from './services/cities.service';

@Module({
  imports: [TypeOrmModule.forFeature([cities])],
  providers: [CitiesService],
  controllers: [],
  exports: [CitiesService],
})
export class DepartmentModule {}
