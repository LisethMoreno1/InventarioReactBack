import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOfGender } from './entities/typeOfGender.entity';
import { TypeOfGenderService } from './services/typeOfGender.service';

@Module({
  imports: [TypeOrmModule.forFeature([typeOfGender])],
  providers: [TypeOfGenderService],
  exports: [TypeOfGenderService],
})
export class TypeOfGenderModule {}
