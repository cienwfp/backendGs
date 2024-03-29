import { Controller, Get, Post, Body, Patch, Request, Param, Delete, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { VtrService } from './vtr.service';
import { CreateVtrDto } from './dto/create-vtr.dto';
import { UpdateVtrDto } from './dto/update-vtr.dto';
import { PrismaExceptionDeleteNotRecord, PrismaExceptionExistVtr, PrismaExceptionGenerec, NotAuth } from './execption/exceptionVtr';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { RolesGuard } from 'src/auth/rule/role.guard';
import { HasRoles } from 'src/auth/rule/has-roles.decorator';
import { Role } from 'src/auth/rule/role.enum';
import { User } from './role/user.decorator';
import { SkipThrottle } from '@nestjs/throttler';
import { env } from 'process';

@SkipThrottle()
@Controller('vtr')
export class VtrController {
  constructor(private readonly vtrService: VtrService) { }

  @HasRoles(Role.Admin, Role.Analist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Request() req, @Body() createVtrDto: CreateVtrDto) {
    createVtrDto.createdBy = req.user.email
    createVtrDto.updatedBy = req.user.email
    try {
      const vtr = await this.vtrService.create(createVtrDto);
      return vtr;
    }
    catch (error) {
      if (error.code === "P2002") {
        throw new PrismaExceptionExistVtr(error.meta.target[0])
      } else {
        throw new PrismaExceptionExistVtr(createVtrDto.placa_oficial)
      }
    }
  }

  @HasRoles(Role.Admin, Role.Analist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async findAll() {
    return await this.vtrService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('findallvtrorg')
  findAllVtrOrg(@User() user: {}) {
    return this.vtrService.findAllVtr(user);
  }

  @HasRoles(Role.Admin, Role.Analist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('situacao')
  async findAllSituacao() {
    return await this.vtrService.findAllSituacao();
  }

  @HasRoles(Role.Admin, Role.Analist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':placa')
  findOnePlacaAtribuida(@Param('placa') placa: string) {
    return this.vtrService.findOnePlacaAtribuida(placa.toUpperCase());
  }

  @HasRoles(Role.Admin, Role.Analist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Param('id') id: number, @Request() req, @Body() updateVtrDto: UpdateVtrDto) {
    updateVtrDto.updatedBy = req.user.email
    //try {
    const vtr = await this.vtrService.update(id, updateVtrDto);
    return vtr;
    //}
    //catch (error) {
    //  if (error.code === "P2025") {
    //    throw new PrismaExceptionDeleteNotRecord(error.meta.cause)
    //  }
    //  throw new PrismaExceptionGenerec()
    //}
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':placa')
  async remove(@Request() req, @Param('placa') placa: string) {
    //if (req.user.email === env.USER_ADMIN) {
    try {
      const vtr = await this.vtrService.remove(placa.toUpperCase());
      return vtr;
    }
    catch (error) {
      if (error.code === "P2025") {
        throw new PrismaExceptionDeleteNotRecord(error.meta.cause)
      }
      throw new PrismaExceptionGenerec()
    }
    //} else {
    throw new NotAuth()
    //}
  }

}
