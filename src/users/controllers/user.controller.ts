import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../Dto/create-user.dto';

@ApiTags('Users')
@Controller('api/user')
export class UserController {
  constructor(private loginService: UserService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<User> {
    return this.loginService.createUser(userData);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.loginService.findAll();
  }

  @Get('identificationNumber')
  async findOne(
    @Param('identificationNumber') identificationNumber: number,
  ): Promise<User | undefined> {
    return this.loginService.findOne(identificationNumber);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() loginData: Partial<User>,
  ): Promise<User | undefined> {
    return this.loginService.update(id, loginData);
  }

  @Delete(':id/:state')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Param('state', ParseIntPipe) state: number,
  ): Promise<boolean> {
    return this.loginService.delete(id, state);
  }
}
