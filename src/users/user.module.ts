import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { RolesModule } from '../rol/roles.module';
import { TypeOfIdentificationModule } from '../type-of-identification/typeOfIdentification.module';
import { Role } from '../rol/entities/Role.entity';
import { TypeOfIdentification } from '../type-of-identification/entities/TypeOfIdentification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, TypeOfIdentification]),
    RolesModule,
    TypeOfIdentificationModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
