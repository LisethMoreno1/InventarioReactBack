import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './Mantenimiento/rol/roles.module';
import { TypeOfIdentificationModule } from './Mantenimiento/type-of-identification/typeOfIdentification.module';
import { DepartmentModule } from './Mantenimiento/Department/Department.module';
import { CitiesModule } from './Mantenimiento/cities/cities.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'inventario',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 10,
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
