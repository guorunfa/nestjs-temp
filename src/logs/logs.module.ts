import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston'; // 引入winston,必须这么写
import { Console } from 'winston/lib/winston/transports';
import { WinstonModule, WinstonModuleOptions, utilities } from 'nest-winston';
import { LogEnum } from '../enum/config.enum';
import 'winston-daily-rotate-file';
@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const consoleTransports = new Console({
          format: winston.format.combine(
            winston.format.timestamp(), // 时间戳
            utilities.format.nestLike(), // nest日志格式
          ),
        });
        const dailyTransports = new winston.transports.DailyRotateFile({
          level: configService.get(LogEnum.LOG_LEVEL),
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
        });
        const dailyInfoTransports = new winston.transports.DailyRotateFile({
          level: configService.get(LogEnum.LOG_LEVEL),
          filename: 'logs/application-%DATE%.log',
          datePattern: 'YYYY-MM-DD-HH',
          zippedArchive: true, // 是否压缩
          maxSize: '20m',
          maxFiles: '14d',
          format: winston.format.combine(
            winston.format.timestamp(), // 时间戳
            utilities.format.nestLike(), // nest日志格式
          ),
        });
        return {
          transports: [
            consoleTransports,
            ...(configService.get(LogEnum.LOG_ON)
              ? [dailyTransports, dailyInfoTransports]
              : []),
          ],
        } as WinstonModuleOptions;
      },
    }),
  ],
})
export class LogsModule {}
