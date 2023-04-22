import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { UserNotFoundException, UnauthorizedException } from './execption/authExceptions';
import * as bcrypt from "bcrypt";
import 'dotenv/config'
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) { }
  async validateUser(loginDto: LoginDto): Promise<any> {
    const user = await this.usersService.findOne(loginDto.email);
    if (!user) {
      throw new UserNotFoundException(loginDto.email);
    }
    if (await bcrypt.compare(loginDto.password, user.password)) {
      return await this.gerarToken(user);
    }
    throw new UnauthorizedException();
  }

  async gerarToken(payload: any) {
    return {
      access_token: this.jwtService.sign(
        { email: payload.email, roles: payload.roles },
        {
          secret: process.env.SECRET_JWT,
          expiresIn: '2h',
        },
      ),
      email: payload.email,
    };
  }
}