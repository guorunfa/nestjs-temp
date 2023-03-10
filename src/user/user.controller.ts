import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '../enum/config.enum';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get()
  getUsers(): any {
    // const db = this.configService.get(ConfigEnum.DB);
    // const host = this.configService.get(ConfigEnum.DB_HOST);
    // console.log(
    //   '🚀 ~ file: user.controller.ts ~ line 15 ~ UserController ~ getUsers ~ db',
    //   db,
    //   host,
    // );
    // const url = this.configService.get('DB_URL');
    // console.log(
    //   '🚀 ~ file: user.controller.ts ~ line 23 ~ UserController ~ getUsers ~ url',
    //   url,
    // );
    // const port = this.configService.get('DB_PORT');
    // console.log(
    //   '🚀 ~ file: user.controller.ts ~ line 28 ~ UserController ~ getUsers ~ port',
    //   port,
    // );
    // console.log(process.env);
    const password =
      process.env.DB_PASSWORD || this.configService.get(ConfigEnum.DB_PASSWORD);
    console.log(
      '🚀 ~ file: user.controller.ts ~ line 34 ~ UserController ~ getUsers ~ password',
      password,
    );
    return this.userService.getUsers();
  }

  @Post()
  addUser(): any {
    return this.userService.addUser();
  }
}
