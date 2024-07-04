import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOfIdentificationService } from './service/typeOfIdentification.service';
import { TypeOfIdentification } from './entities/TypeOfIdentification.entity';
import { TypeOfIdentificationController } from './controllers/typeOfIdentification.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOfIdentification])],
  providers: [TypeOfIdentificationService],
  controllers: [TypeOfIdentificationController],
  exports: [TypeOfIdentificationService],
})
export class TypeOfIdentificationModule {}
