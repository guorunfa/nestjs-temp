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

### 配置yml
1. `pnpm i js-yaml`  `pnpm i @types/js-yaml -D`  
2. 创建config/config.yml文件 
``` 
db:
  mysql1:
    host: 127.0.0.1
    port: 3306
    name: test

  mysql2:
    host: 127.0.0.1
    port: 3306
```
3. 创建 `src/configuration.ts` 
```
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
const YAML_CONFIG_FILENAME = 'config.yml';
const filePath = join(__dirname, '../config', YAML_CONFIG_FILENAME);
export default () => {
  return yaml.load(readFileSync(filePath, 'utf8'));
};
```
在 `app.module.ts`用load方法里面引入
```
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  ```
  增加复杂配置
  1. 添加 `config/config.development.yml` `config/config.production.yml`文件，此时 `config.yml`文件配置信息可共享，也可被覆盖。
  2. 改造`src/configuration.ts` 安装`lodash`库，使用`merge`方法合并文件
  ```
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as _ from 'lodash';

const YAML_COMMON_CONFIG_FILENAME = 'config.yml';

const filePath = join(__dirname, '../config', YAML_COMMON_CONFIG_FILENAME);

const envPath = join(
  __dirname,
  '../config',
  `config.${process.env.NODE_ENV || 'development'}.yml`,
);

const commonConfig = yaml.load(readFileSync(filePath, 'utf8'));

const envConfig = yaml.load(readFileSync(envPath, 'utf8'));

// 因为ConfigModule有一个load方法->函数
export default () => {
  return _.merge(commonConfig, envConfig);
};
```
