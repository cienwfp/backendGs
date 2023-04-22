import {
  utilities as nestWinstonModuleUtilities,
  WinstonModuleOptions,
} from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export const winstonConfig: WinstonModuleOptions = {
  levels: winston.config.npm.levels,
  level: 'info',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
    /* new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp()),
      filename: 'application.log',
      dirname: 'logs',
    }), */

    new winston.transports.DailyRotateFile({
      filename: './logs/application-%DATE%.log',
      datePattern: 'YYYY-MM',
      //datePattern: 'mm',
      zippedArchive: true,
      //maxSize: '20m',
      //maxFiles: '14d'
    }),

  ],

};