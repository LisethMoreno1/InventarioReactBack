import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './Customers/customers.module';
import { CategoryModule } from './Mantenimiento/category/category.module';
import { SubcategoryModule } from './Mantenimiento/category/Subcategory/subcategory .module';
import { CitiesModule } from './Mantenimiento/cities/cities.module';
import { DepartmentModule } from './Mantenimiento/Department/Department.module';
import { RolesModule } from './Mantenimiento/rol/roles.module';
import { TypeOfIdentificationModule } from './Mantenimiento/type-of-identification/typeOfIdentification.module';
import { UserModule } from './users/user.module';
import { OrdersModule } from './Orders/orders.module';

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
    CategoryModule,
    SubcategoryModule,
    CustomersModule,
    OrdersModule,
  ],
  controllers: [],
})
export class AppModule {}
