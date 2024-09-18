import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateTypeOfAddressDto } from '../dto/typeOfAddress.dto';
import { TypeOfAddressService } from '../services/typeOfAddress.service';
import { TypeOfAddress } from '../entities/typeOfAddress.entity';
import { ApiTags } from '@nestjs/swagger';

ApiTags('TypeOfAddress');
@Controller('api/TypeOfAddress')
export class TypeOfAddressController {
  constructor(private readonly typeOfAddressService: TypeOfAddressService) {}

  @Post()
  async create(
    @Body() createTypeOfAddressDto: CreateTypeOfAddressDto,
  ): Promise<TypeOfAddress> {
    return this.typeOfAddressService.create(createTypeOfAddressDto);
  }

  @Get()
  async findAll(): Promise<TypeOfAddress[]> {
    return this.typeOfAddressService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TypeOfAddress> {
    return this.typeOfAddressService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTypeOfAddressDto: CreateTypeOfAddressDto,
  ): Promise<TypeOfAddress> {
    return this.typeOfAddressService.update(id, updateTypeOfAddressDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.typeOfAddressService.remove(id);
  }
}
