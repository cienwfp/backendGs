import {
  utilities as nestWinstonModuleUtilities,
  WinstonModuleOptions,
} from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { Observable } from 'rxjs';
import { Injectable } from '@nestjs/common';

const { combine, timestamp, json, cli, splat, printf, colorize } = winston.format;
/* 
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
    
    new winston.transports.DailyRotateFile({
      filename: './logs/application-%DATE%.log',
      datePattern: 'YYYY-MM',
      //datePattern: 'mm',
      zippedArchive: true,
      //maxSize: '20m',
      //maxFiles: '14d'
    }),
    
     new winston.transports.File({
      format: winston.format.combine(
        winston.format.timestamp()),
      filename: 'application.log',
      dirname: 'logs',
    }),
  ],
   
};*/
/* 
const fileRotateTransport = new winston.transports.DailyRotateFile({
  filename: './logs/application-%DATE%.log',
  datePattern: 'YYYY-MM',
  //datePattern: 'mm',
  zippedArchive: true,
  //maxSize: '20m',
  //maxFiles: '14d'
})

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  defaultMeta: {
    service: 'admin-service',
  },
  format: combine(timestamp(), json()),
  transports: [fileRotateTransport],
}) */

export const winstonConfig: WinstonModuleOptions = {
  transports: [
    new winston.transports.DailyRotateFile({
      watchLog: true,
      filename: `logs/%DATE%-error.log`,
      level: 'error',
      format: combine(timestamp(), json()),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '15d',
    }),
    // same for all levels
    new winston.transports.DailyRotateFile({
      watchLog: true,
      filename: `logs/%DATE%-full.log`,
      level: 'info',
      format: combine(timestamp(), json()),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '15d',
    }),
    new winston.transports.DailyRotateFile({
      watchLog: true,
      filename: `logs/%DATE%-warn.log`,
      level: 'warn',
      format: combine(timestamp(), json()),
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxFiles: '15d',
    }),
    new winston.transports.Console({
      format: combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike('GSI', {
          colors: true,
          prettyPrint: true,
        }),
      ),
    }),
  ],
}