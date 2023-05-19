## [热重载配置](https://docs.nestjs.com/recipes/hot-reload)
**1.** ` pnpm i --save-dev webpack-node-externals run-script-webpack-plugin webpack`
**2.**  Once the installation is complete, create a `webpack-hmr.config.js` file in the root directory of your application.
```javascript
const nodeExternals = require('webpack-node-externals');
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');

module.exports = function (options, webpack) {
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({ name: options.output.filename, autoRestart: false }),
    ],
  };
};
```
To enable HMR, open the application entry file `(main.ts)` and add the following webpack-related instructions:
```javascript
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
```
To simplify the execution process, add a script to your `package.json` file.

```javascript
"start:dev": "nest build --webpack --webpackPath webpack-hmr.config.js --watch"


## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

### typrorm [https://typeorm.bootcss.com/one-to-one-relations]

### winston的配置
1. `pnpm i nest-winston winston`
2. 
``` javascript
@Global()
@Module({
  controllers: [],
  providers: [Logger],
  exports: [Logger],
})
```
3. 
``` javascript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createLogger } from 'winston';
import * as winston from 'winston'; // 引入winston,必须这么写
import { WinstonModule, utilities } from 'nest-winston';

async function bootstrap() {
  const instance = createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(), // 时间戳
          utilities.format.nestLike(), // nest日志格式
        ),
      }),
    ],
  });
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      instance,
    }),
  });
  await app.listen(3001);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
```
4.使用（在controller里面）
``` javascript
import {  Logger} from '@nestjs/common';
private readonly logger: Logger
```
5.日志文件插件 
` pnpm i winston-daily-rotate-file`

在main.ts中配置
``` javascript
  const instance = createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(), // 时间戳
          utilities.format.nestLike(), // nest日志格式
        ),
      }),
      new winston.transports.DailyRotateFile({
        filename: 'logs/application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true, // 是否压缩
        maxSize: '20m',
        maxFiles: '14d',
      }),
    ],
  });
```