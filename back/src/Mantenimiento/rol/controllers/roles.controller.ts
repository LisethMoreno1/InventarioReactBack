import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { RolesService } from '../services/roles.service';
import { Role } from '../entities/Role.entity';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Roles')
@Controller('api/roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesService.createRole(createRoleDto);
  }

  @Get()
  async findAllRoles(): Promise<Role[]> {
    return this.rolesService.findAllRoles();
  }

  @Get(':id')
  async findRoleById(@Param('id') id: number): Promise<Role> {
    return this.rolesService.findRoleById(id);
  }

  @Put(':id')
  async updateRole(
    @Param('id') id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    return this.rolesService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: number): Promise<void> {
    return this.rolesService.deleteRole(id);
  }
}
