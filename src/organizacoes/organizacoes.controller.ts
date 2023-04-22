import { Controller, Get, Post, Body, Request, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrganizacoesService } from './organizacoes.service';
import { CreateOrganizacoeDto } from './dto/create-organizacoe.dto';
import { RolesGuard } from 'src/auth/rule/role.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { Role } from 'src/auth/rule/role.enum';
import { HasRoles } from 'src/auth/rule/has-roles.decorator';
import {
  OrganizacaoNotFoundException,
  PrismaExceptionDeleteNotRecord,
  PrismaExceptionExistOrganizacao
} from './execption/exceptionOrganizacao';
import { UpdateOrganizacoeDto } from './dto/update-organizacoe.dto';

@Controller('organizacoes')
export class OrganizacoesController {
  constructor(private readonly organizacoesService: OrganizacoesService) { }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Request() req, @Body() createOrganizacoeDto: CreateOrganizacoeDto) {
    createOrganizacoeDto.createdBy = req.user.email
    createOrganizacoeDto.updatedBy = req.user.email
    try {
      const og = this.organizacoesService.create(createOrganizacoeDto);
      return og;
    }
    catch (error) {
      if (error.code === "P2002") {
        throw new PrismaExceptionExistOrganizacao(error.meta.target[0])
      }
    }
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.organizacoesService.findAll();
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':sigla')
  async findOne(@Param('sigla') sigla: string) {
    const og = await this.organizacoesService.findOne(sigla);
    if (og) {
      return og;
    } else {
      throw new OrganizacaoNotFoundException(sigla)
    }
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Request() req, @Param('id') id: number, @Body() updateOrganizacoeDto: UpdateOrganizacoeDto) {
    updateOrganizacoeDto.updatedBy = req.user.email
    try {
      const res = await this.organizacoesService.update(id, updateOrganizacoeDto);
      return res
    }
    catch (error) {
      if (error.code === "P2025") {
        throw new PrismaExceptionDeleteNotRecord(error.meta.cause)
      }
    }
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const res = await this.organizacoesService.remove(id);
      return res
    }
    catch (error) {
      if (error.code === "P2025") {
        throw new PrismaExceptionDeleteNotRecord(error.meta.cause)
      }
    }
  }
}
