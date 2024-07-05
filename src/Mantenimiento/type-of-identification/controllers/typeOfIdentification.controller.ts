import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { TypeOfIdentification } from '../entities/TypeOfIdentification.entity';
import { TypeOfIdentificationService } from '../service/typeOfIdentification.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TypeOfIdentifications')
@Controller('api/typeOfIdentifications')
export class TypeOfIdentificationController {
  constructor(
    private readonly typeOfIdentificationService: TypeOfIdentificationService,
  ) {}

  @Get()
  async findAll(): Promise<TypeOfIdentification[]> {
    return this.typeOfIdentificationService.findAll();
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<TypeOfIdentification> {
    const type = await this.typeOfIdentificationService.findById(id);
    if (!type) {
      throw new NotFoundException(
        `TypeOfIdentification con ID ${id} no encontrado`,
      );
    }
    return type;
  }

  @Post()
  async create(
    @Body() typeOfIdentification: TypeOfIdentification,
  ): Promise<TypeOfIdentification> {
    return this.typeOfIdentificationService.create(typeOfIdentification);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedTypeOfIdentification: TypeOfIdentification,
  ): Promise<TypeOfIdentification> {
    const updatedType = await this.typeOfIdentificationService.update(
      id,
      updatedTypeOfIdentification,
    );
    if (!updatedType) {
      throw new NotFoundException(
        `TypeOfIdentification con ID ${id} no encontrado`,
      );
    }
    return updatedType;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    const result = await this.typeOfIdentificationService.delete(id);
    if (result === 0) {
      throw new NotFoundException(
        `TypeOfIdentification con ID ${id} no encontrado`,
      );
    }
  }
}
