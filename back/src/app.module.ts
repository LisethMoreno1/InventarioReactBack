import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './Customers/customers.module';
import { MailModule } from './Mail/mail.module';
import { BankModule } from './Mantenimiento/bank/bank.module';
import { CategoryModule } from './Mantenimiento/category/category.module';
import { SubcategoryModule } from './Mantenimiento/category/Subcategory/subcategory .module';
import { CitiesModule } from './Mantenimiento/cities/cities.module';
import { DepartmentModule } from './Mantenimiento/Department/Department.module';
import { RolesModule } from './Mantenimiento/rol/roles.module';
import { TypeOfAddressModule } from './Mantenimiento/type-of-address/typeOfAddress.module';
import { TypeOfCurrencyModule } from './Mantenimiento/type-Of-currency/typeOfcurrency.module';
import { TypeOfIdentificationModule } from './Mantenimiento/type-of-identification/typeOfIdentification.module';
import { OrderDetailsModule } from './OrderDetails/orderDetails.module';
import { OrdersModule } from './Orders/orders.module';
import { OrderStatusModule } from './OrderStatus/orderStatus.module';
import { PaymentModule } from './Payment/payment.module';
import { ProductModule } from './Product/product.module';
import { PurchaseOfProductModule } from './purchaseOfProduct/purchaseOfProduct.module';
import { UserModule } from './users/user.module';

const configPath = path.join(__dirname, '..', 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// Comprobación de existencia de las claves necesarias
const retryDelay = config.otherConfig?.retryDelay ?? 5000; // Valor predeterminado si no existe
const retryAttempts = config.otherConfig?.retryAttempts ?? 3;
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
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryDelay: retryDelay,
      retryAttempts: retryAttempts,
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
    MailModule,
    OrderDetailsModule,
    OrderStatusModule,
    TypeOfCurrencyModule,
    TypeOfAddressModule,
    BankModule,
    PaymentModule,
    ProductModule,
    PurchaseOfProductModule,
  ],
  controllers: [],
})
export class AppModule {}
