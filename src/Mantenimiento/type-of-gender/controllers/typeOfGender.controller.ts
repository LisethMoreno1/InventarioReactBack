import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { typeOfGender } from '../entities/typeOfGender.entity';
import { TypeOfGenderService } from '../services/typeOfGender.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateGenderDto } from '../Dto/update-gender.dto';

@ApiTags('TypeOfGenders')
@Controller('api/typeOfGenders')
export class TypeOfGenderController {
  constructor(private readonly typeOfGenderService: TypeOfGenderService) {}

  @Get()
  async findAll(): Promise<typeOfGender[]> {
    return this.typeOfGenderService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<typeOfGender> {
    const type = await this.typeOfGenderService.findById(id);
    if (!type) {
      throw new NotFoundException(`TypeOfGender con id ${id} no encontrado`);
    }
    return type;
  }

  @Post()
  async create(@Body() typeOfGender: typeOfGender): Promise<typeOfGender> {
    return this.typeOfGenderService.create(typeOfGender);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatedTypeOfGender: UpdateGenderDto,
  ): Promise<typeOfGender> {
    const updatedType = await this.typeOfGenderService.updateGender(
      id,
      updatedTypeOfGender,
    );
    if (!updatedType) {
      throw new NotFoundException(`TypeOfGender con id ${id} no encontrado`);
    }
    return updatedType;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const result = await this.typeOfGenderService.delete(id);
    if (result === 0) {
      throw new NotFoundException(`TypeOfGender con id ${id} no encontrado`);
    }
  }
}
