import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { BankService } from '../services/bank.service';
import { CreateBankDto } from '../dto/bank.dto';
import { Bank } from '../entities/bank.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Banks')
@Controller('api/banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  create(@Body() createBankDto: CreateBankDto): Promise<Bank> {
    return this.bankService.create(createBankDto);
  }

  @Get()
  findAll(): Promise<Bank[]> {
    return this.bankService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Bank> {
    return this.bankService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateBankDto: CreateBankDto,
  ): Promise<Bank> {
    return this.bankService.update(id, updateBankDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.bankService.remove(id);
  }
}
