import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLoggerDto } from './dto/create-logger.dto';

@Injectable()
export class LoggerService extends Logger {
  constructor(private prisma: PrismaService) {
    super();
  }

  async logHttp(info: CreateLoggerDto) {
    await this.prisma.log.create({ data: info });
  }
}