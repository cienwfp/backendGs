import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { OrganizacoesModule } from './organizacoes/organizacoes.module';
import { AuthModule } from './auth/auth.module';
import { VtrModule } from './vtr/vtr.module';

import { winstonConfig } from './logger/logger.config';
//import { logger } from './logger/logger.config';
import { LoggerModule } from './logger/logger.module';
import { WinstonModule } from 'nest-winston';
import { RequestLoggerMiddleware } from './logger/logger.interceptor';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { MailController } from './mail/mail.controller';
import { MailModule } from './mail/mail.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ThrottlerException, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

class MyThrottlerGuard extends ThrottlerGuard {
  protected throwThrottlingException(): void {
    throw new ThrottlerException("Máximo de tentativas exedida. Seu login foi suspenso por 3 minutos");
  }
}

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
    ThrottlerModule.forRoot({
      ttl: 60 * 5,
      limit: 9,
    })
  ],
  controllers: [AppController, MailController],
  providers: [AppService,
    /*     {
          provide: APP_INTERCEPTOR,
          useClass: RequestLoggerMiddleware,
        }, */
    {
      provide: APP_GUARD,
      useClass: MyThrottlerGuard,
    }],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
