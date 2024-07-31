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
  InternalServerErrorException,
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
  async deleteTypeOfIdentification(@Param('id') id: number) {
    try {
      const result = await this.typeOfIdentificationService.delete(id);
      if (!result) {
        throw new NotFoundException(
          `TypeOfIdentification with ID ${id} not found`,
        );
      }
      return { message: 'TypeOfIdentification deleted successfully' };
    } catch (error) {
      console.error('Error deleting TypeOfIdentification:', error);
      throw new InternalServerErrorException(
        'Failed to delete TypeOfIdentification',
      );
    }
  }
}
