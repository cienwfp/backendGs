import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './logger/logger.config';

async function bootstrap() {

  const logger = WinstonModule.createLogger(winstonConfig)
  const app = await NestFactory.create(AppModule, { logger, cors: true });

  const config = new DocumentBuilder()
    .setTitle('Sistema de Controle e Auditoria de Placas Especiais - SCAPE')
    .setDescription('Esta API foi desenvolvida para o controle de viaturas oficias que utilizam placa reservada do Estado do Rio de Janeiro. Esta API é mantida pelo Gabinete de Segurança Institucional - GSI do Estado do Rio de Janeiro.')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3333);
}
bootstrap();
