import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { typeOfGender } from '../entities/typeOfGender.entity';
import { TypeOfGenderService } from '../services/typeOfGender.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TypeOfGenders')
@Controller('api/typeOfGenders')
export class TypeOfGenderController {
  constructor(private readonly typeOfGenderService: TypeOfGenderService) {}

  @Get()
  async findAll(): Promise<typeOfGender[]> {
    return this.typeOfGenderService.findAll();
  }

  @Get(':genre')
  async findById(@Param('genre') genre: string): Promise<typeOfGender> {
    const type = await this.typeOfGenderService.findById(genre);
    if (!type) {
      throw new NotFoundException(`TypeOfGender with genre ${genre} not found`);
    }
    return type;
  }
}
