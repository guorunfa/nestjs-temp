import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createLogger } from 'winston';
import * as winston from 'winston'; // 引入winston,必须这么写
import { WinstonModule, utilities } from 'nest-winston';
import 'winston-daily-rotate-file';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const instance = createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(), // 时间戳
          utilities.format.nestLike(), // nest日志格式
        ),
      }),
      new winston.transports.DailyRotateFile({
        level: 'warn',
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true, // 是否压缩
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(
          winston.format.timestamp(), // 时间戳
          utilities.format.nestLike(), // nest日志格式
          winston.format.simple(), // 简单格式
        ),
      }),
      new winston.transports.DailyRotateFile({
        level: 'info',
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true, // 是否压缩
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(
          winston.format.timestamp(), // 时间戳
          utilities.format.nestLike(), // nest日志格式
        ),
      }),
    ],
  });
  const logger = WinstonModule.createLogger({
    instance,
  });
  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  await app.listen(3001);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
