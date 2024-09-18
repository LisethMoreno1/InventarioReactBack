import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOfGender } from './entities/typeOfGender.entity';
import { TypeOfGenderService } from './services/typeOfGender.service';
import { TypeOfGenderController } from './controllers/typeOfGender.controller';

@Module({
  imports: [TypeOrmModule.forFeature([typeOfGender])],
  providers: [TypeOfGenderService],
  controllers: [TypeOfGenderController],
  exports: [TypeOfGenderService],
})
export class TypeOfGenderModule {}
