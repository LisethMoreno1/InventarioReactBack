import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { TypeOfIdentification } from '../Mantenimiento/type-of-identification/entities/TypeOfIdentification.entity';
import { TypeOfIdentificationModule } from '../Mantenimiento/type-of-identification/typeOfIdentification.module';
import { Role } from '../Mantenimiento/rol/entities/Role.entity';
import { RolesModule } from '../Mantenimiento/rol/roles.module';
import { TypeOfGenderModule } from '../Mantenimiento/type-of-gender/typeOfGender.module';
import { typeOfGender } from '../Mantenimiento/type-of-gender/entities/typeOfGender.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, TypeOfIdentification, typeOfGender]),
    RolesModule,
    TypeOfIdentificationModule,
    TypeOfGenderModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
