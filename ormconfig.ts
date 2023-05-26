import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import { ConfigEnum } from './src/enum/config.enum';
import { Profile } from './src/user/profile.entity';
import { User } from './src/user/user.entity';
import { Logs } from './src/logs/logs.entity';
import { Roles } from './src/roles/roles.entity';

// 通过环境变量读取不同的.env文件
function getEnv(env: string): Record<string, unknown> {
  if (fs.existsSync(env)) {
    return dotenv.parse(fs.readFileSync(env));
  }
  return {};
}

// 通过dotENV来解析不同的配置
function buildConnectionOptions() {
  const defaultConfig = getEnv('.env');
  const envConfig = getEnv(`.env.${process.env.NODE_ENV || 'development'}`);
  // configService
  const config = { ...defaultConfig, ...envConfig };

  // 优化目录读取
  const entitiesDir =
    process.env.NODE_ENV === 'development'
      ? [__dirname + '/**/**/*.entity{.js,.ts}']
      : [__dirname + '/**/*.entity{.js,.ts}'];
  console.log('entitiesDir', process.env.NODE_ENV, entitiesDir);
  return {
    type: config[ConfigEnum.DB_TYPE],
    host: config[ConfigEnum.DB_HOST],
    port: config[ConfigEnum.DB_PORT],
    username: config[ConfigEnum.DB_USERNAME],
    password: config[ConfigEnum.DB_PASSWORD],
    database: config[ConfigEnum.DB_DATABASE],
    entities: [User, Profile, Logs, Roles], // TODO----> entitiesDir 暂时不支持，没找到问题所在
    // 同步本地的schema与数据库 -> 初始化的时候去使用
    synchronize: true,
    // logging: process.env.NODE_ENV === 'development',
    logging: false,
  } as TypeOrmModuleOptions;
}

export const connectionParams = buildConnectionOptions();

export default new DataSource({
  ...connectionParams,
  migrations: ['src/migrations/**'],
  subscribers: [],
} as DataSourceOptions);
