
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto);
  }
}