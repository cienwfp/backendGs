import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { HasRoles } from 'src/auth/rule/has-roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { RolesGuard } from 'src/auth/rule/role.guard';
import { Role } from 'src/auth/rule/role.enum';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) { }

  /*  @Post()
   create(@Body() createDashboardDto: CreateDashboardDto) {
     return this.dashboardService.create(createDashboardDto);
   } */

  @HasRoles(Role.Admin, Role.Analist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  countVtrByOrg() {
    return this.dashboardService.countVtr();
  }

  /* @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dashboardService.findOne(+id);
  } */

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateDashboardDto: UpdateDashboardDto) {
    return this.dashboardService.update(+id, updateDashboardDto);
  } */

  /* @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dashboardService.remove(+id);
  } */
}
