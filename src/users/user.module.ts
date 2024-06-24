import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { RolesModule } from '../rol/roles.module';
import { TypeOfIdentificationModule } from '../type-of-identification/typeOfIdentification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RolesModule,
    TypeOfIdentificationModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
