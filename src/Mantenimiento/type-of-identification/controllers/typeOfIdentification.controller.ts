import {
  Controller,
  Get,
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
        `TypeOfIdentification with ID ${id} not found`,
      );
    }
    return type;
  }
}
