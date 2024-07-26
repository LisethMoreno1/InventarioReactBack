import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TypeOfCurrencyService } from '../services/typeOfcurrency.service';
import { CreateTypeOfCurrencyDto } from '../dto/typeOfcurrency.dto';
import { ApiTags } from '@nestjs/swagger';
import { TypeOfCurrency } from '../entities/typeOfcurrency.entity';

@ApiTags('TypeOfCurrencies')
@Controller('api/TypeOfCurrencies')
export class TypeOfCurrencyController {
  constructor(private readonly typeOfCurrencyService: TypeOfCurrencyService) {}

  @Post()
  async create(
    @Body() createTypeOfCurrencyDto: CreateTypeOfCurrencyDto,
  ): Promise<TypeOfCurrency> {
    return this.typeOfCurrencyService.create(createTypeOfCurrencyDto);
  }

  @Get()
  async findAll(): Promise<TypeOfCurrency[]> {
    return this.typeOfCurrencyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TypeOfCurrency> {
    return this.typeOfCurrencyService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.typeOfCurrencyService.remove(id);
  }
}
