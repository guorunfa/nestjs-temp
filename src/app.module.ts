import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigEnum } from './enum/config.enum';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import * as Joi from 'joi';

import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Profile } from './user/profile.entity';
console.log('process.env.NODE_ENV', process.env.NODE_ENV);

const envFilePath = `.env.${process.env.NODE_ENV || `development`}`;
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        DB_PORT: Joi.number().default(3306),
        DB_URL: Joi.string().domain(),
        DB_HOST: Joi.string().ip(),
      }),
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: '',
    //   port: 3306,
    //   username: 'root',
    //   password: '',
    //   database: 'testdb',
    //   entities: [],
    //   // 同步本地的schema与数据库 -> 初始化的时候去使用
    //   synchronize: true,
    //   logging: ['error'],
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: configService.get(ConfigEnum.DB_TYPE),
          host: configService.get(ConfigEnum.DB_HOST),
          port: configService.get(ConfigEnum.DB_PORT),
          username: configService.get(ConfigEnum.DB_USERNAME),
          password: configService.get(ConfigEnum.DB_PASSWORD),
          database: configService.get(ConfigEnum.DB_DATABASE),
          entities: [User, Profile],
          // 同步本地的schema与数据库 -> 初始化的时候去使用
          synchronize: configService.get(ConfigEnum.DB_SYNC),
          logging: ['error'],
        } as TypeOrmModuleOptions),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
