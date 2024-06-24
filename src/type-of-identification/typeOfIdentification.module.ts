import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOfIdentificationService } from './service/typeOfIdentification.service';
import { TypeOfIdentification } from './entities/TypeOfIdentification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOfIdentification])],
  providers: [TypeOfIdentificationService],
  exports: [TypeOfIdentificationService], // Exportar el servicio si es necesario
})
export class TypeOfIdentificationModule {}
