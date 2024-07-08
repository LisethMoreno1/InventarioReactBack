import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './Mantenimiento/rol/roles.module';
import { TypeOfIdentificationModule } from './Mantenimiento/type-of-identification/typeOfIdentification.module';
import { DepartmentModule } from './Mantenimiento/Department/Department.module';
import { CitiesModule } from './Mantenimiento/cities/cities.module';
import * as fs from 'fs';
import * as path from 'path';

const configPath = path.join(__dirname, '..', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: config.database.type,
      host: config.database.host,
      port: config.database.port,
      username: config.database.username,
      password: config.database.password,
      database: config.database.database,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryDelay: config.otherConfig.retryDelay,
      retryAttempts: config.otherConfig.retryAttempts,
    }),
    UserModule,
    RolesModule,
    AuthModule,
    TypeOfIdentificationModule,
    DepartmentModule,
    CitiesModule,
  ],
  controllers: [],
})
export class AppModule {}
