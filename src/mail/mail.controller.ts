import { Controller, Get, Post, Request, Body, Patch, Param, Delete, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { UserNotFoundException } from './execption/userNotFound';
import * as bcrypt from 'bcrypt';
import { MailService } from './mail.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RecuperacaoPassDto } from './dto/update-pass.dto';

@Controller('mail')
export class MailController {
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService) { }

  @Get(':email')
  async sendMailRecuperacao(@Param('email') email: string, @Res() res: Response) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new UserNotFoundException(email)
    }

    try {
      await this.mailService.sendUserRecuparacao(user)
      res.status(HttpStatus.OK).send({ message: "Email enivado com sucesso" })
    } catch (error) {
      res.status(HttpStatus.FAILED_DEPENDENCY).send({ message: error })
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/recuperacao/:token')
  async update(@Param('token') email: string, @Request() req, @Body() updateUserDto: RecuperacaoPassDto) {
    updateUserDto.updatedBy = req.user.email
    updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10)
    const user = await this.usersService.updatePass(req.user.email, updateUserDto.password, req.user.email)
    return user;
  }

}
