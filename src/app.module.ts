import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { OrganizacoesModule } from './organizacoes/organizacoes.module';
import { AuthModule } from './auth/auth.module';
import { VtrModule } from './vtr/vtr.module';

import { winstonConfig } from './logger/logger.config';
import { LoggerModule } from './logger/logger.module';
import { WinstonModule } from 'nest-winston';
import { LoggerInterceptor } from './logger/logger.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MailController } from './mail/mail.controller';
import { MailModule } from './mail/mail.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    OrganizacoesModule,
    AuthModule,
    VtrModule,
    WinstonModule.forRoot(winstonConfig),
    LoggerModule,
    MailModule,
    DashboardModule,
  ],
  controllers: [AppController, MailController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: LoggerInterceptor,
  },],
})
export class AppModule { }
