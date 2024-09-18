import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOfCurrencyService } from './services/typeOfcurrency.service';
import { TypeOfCurrencyController } from './controller/typeOfcurrency.controller';
import { TypeOfCurrency } from './entities/typeOfcurrency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOfCurrency])],
  providers: [TypeOfCurrencyService],
  controllers: [TypeOfCurrencyController],
  exports: [TypeOfCurrencyService],
})
export class TypeOfCurrencyModule {}
