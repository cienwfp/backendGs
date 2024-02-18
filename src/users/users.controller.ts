import { Controller, Request, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePassUserDto } from './dto/update-pass.dto';
import { UserNotFoundException, PrismaExceptionExistUser, PrismaExceptionDeleteNotRecord, Unauthorized } from './execption/userNotFound';
import { HasRoles } from 'src/auth/rule/has-roles.decorator';
import { RolesGuard } from 'src/auth/rule/role.guard';
import { Role } from 'src/auth/rule/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import * as bcrypt from 'bcrypt';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @HasRoles(Role.Admin, Role.Analist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Request() req: any, @Body() createUserDto: CreateUserDto) {
    createUserDto.createdBy = req.user.email
    createUserDto.updatedBy = req.user.email
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, 10)
      const user = await this.usersService.create(createUserDto);
      console.log('user', user)
      return user
    }
    catch (error) {
      if (error.code === "P2002") {
        throw new PrismaExceptionExistUser(error.meta.target[0])
      }
    }
  }

  @HasRoles(Role.Admin, Role.Analist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @HasRoles(Role.Admin, Role.Analist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':email')
  async findOne(@Param('email') email: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UserNotFoundException(email)
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('changepass/:email')
  async changePass(@Param('email') email: string, @Request() req: any, @Body() updadePassDto: ChangePassUserDto) {
    const userFind = await this.usersService.findOne(email)
    if (userFind.email === updadePassDto.email && await bcrypt.compare(updadePassDto.passwordOld, userFind.password)) {
      updadePassDto.password = await bcrypt.hash(updadePassDto.password, 10)
      const user = await this.usersService.updatePass(email, updadePassDto.password, req.user.email)
      return user;
    }
    throw new Unauthorized();
  }

  @HasRoles(Role.Admin, Role.Analist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':email')
  async update(@Param('email') email: string, @Request() req, @Body() updateUserDto: UpdateUserDto) {
    updateUserDto.updatedBy = req.user.email
    const user = await this.usersService.update(email, updateUserDto)
    return user;
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':email')
  async remove(@Param('email') email: string) {
    try {
      const res = await this.usersService.remove(email);
      return res
    }
    catch (error) {
      if (error.code === "P2025") {
        throw new PrismaExceptionDeleteNotRecord(error.meta.cause)
      }
    }
  }
}
