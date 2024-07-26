import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOfAddress } from './entities/typeOfAddress.entity';
import { TypeOfAddressController } from './controller/typeOfAddress.controller';
import { TypeOfAddressService } from './services/typeOfAddress.service';


@Module({
  imports: [TypeOrmModule.forFeature([TypeOfAddress])],
  providers: [TypeOfAddressService],
  controllers: [TypeOfAddressController],
  exports: [TypeOfAddressService],
})
export class TypeOfAddressModule {}
