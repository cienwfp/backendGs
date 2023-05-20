/* import {
  Injectable,
  Inject,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Logger, createLogger } from 'winston';
import { Observable } from 'rxjs';
import * as winston from 'winston';
const { combine, timestamp, json } = winston.format;

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(@Inject('winston') private logger: Logger) { }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.log(context.switchToHttp().getRequest(), context.switchToHttp().getResponse());
    return next.handle();
  }

  private log(req: any, res: any) {
    const body = { ...req.body };
    delete body.password;
    delete body.passwordConfirmation;
    const user = (req as any).user;
    const userEmail = user ? user.email : null;
    this.logger.info({
      context: "Resquest Aplication",
      level: 'info',
      message: ({
        timestamp: new Date().toISOString(),
        method: req.method,
        route: req.route.path,
        data: {
          body: body,
          query: req.query,
          params: req.params,
        },
        from: req.ip,
        madeBy: userEmail,
        dataResponse: {
          status: res.statusCode,
          message: res.message
        }
      })
    });
  }
} */

import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const statusCode = res.statusCode;
      if (statusCode !== 200) {
        this.logger.warn(`${req.method} - ${req.url} - ${statusCode} - ${res.statusMessage} - ${req.ip} - ${JSON.stringify(req.body.email)} - ${JSON.stringify(req.user)} - ${JSON.stringify(req.params)} - ${JSON.stringify(req.query)}`, "GSI");
      }
      else {
        this.logger.log(`${req.method} - ${req.url} - ${statusCode} - ${res.statusMessage} - ${req.ip} - ${JSON.stringify(req.body.email)} - ${JSON.stringify(req.user)} - ${JSON.stringify(req.params)} - ${JSON.stringify(req.query)}`, "GSI");
      }
    });
    next();
  }
}