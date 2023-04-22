import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private readonly jwtService: JwtService) { }

  async sendUserRecuparacao(user: any) {
    const userRecuperacao = {
      access_token: this.jwtService.sign(
        { email: user.email },
        {
          secret: process.env.SECRET_JWT,
          expiresIn: '2h',
        },
      ),
      email: user.email,
    };

    await this.mailerService.sendMail({
      to: userRecuperacao.email,
      from: process.env.AUTH_USER_EMAIL,
      subject: 'Recuperação de senha - GSI',
      template: './recuperacao',
      context: {
        url_image: `${process.env.URL_INTERFACE}/asserts/gsi/gsi_196x196.png`,
        url: `${process.env.URL_INTERFACE}/auth/recuperacao/${userRecuperacao.access_token}`
      },
    });
  }
}