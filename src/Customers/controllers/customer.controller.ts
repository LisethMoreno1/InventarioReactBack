import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CustomersService } from '../services/customer.service';
import { Customers } from '../Entities/customers.entity';
import { CreateCustomerDto } from '../Dto/create.customers.dto';
import { ApiTags } from '@nestjs/swagger';

ApiTags('Customers');
@Controller('api/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async findAll(): Promise<Customers[]> {
    return this.customersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') identificationNumber: string): Promise<Customers> {
    return this.customersService.findOne(identificationNumber);
  }

  @Post()
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
  ): Promise<Customers> {
    return this.customersService.create(createCustomerDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCustomerDto: CreateCustomerDto,
  ): Promise<Customers> {
    return this.customersService.update(id, updateCustomerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.customersService.remove(id);
  }
}
