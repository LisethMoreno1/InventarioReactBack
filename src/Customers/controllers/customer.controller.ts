import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { Customers } from '../Entities/customers.entity';
import { CustomersService } from '../services/customer.service';

@Controller('api/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  findAll(): Promise<Customers[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('identificationNumber') identificationNumber: number,
  ): Promise<Customers> {
    return this.customersService.findOne(+identificationNumber);
  }

  @Post()
  create(@Body() createCustomerDto: Customers): Promise<Customers> {
    return this.customersService.create(createCustomerDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: Customers,
  ): Promise<Customers> {
    return this.customersService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.customersService.delete(+id);
  }
}
