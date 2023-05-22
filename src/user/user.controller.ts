import {
  Controller,
  Get,
  Inject,
  LoggerService,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    // @Inject(Logger) private readonly logger: LoggerService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Get('/add')
  getUsers(): any {
    // console.log('add');
    return this.userService.add();
  }

  @Post()
  addUser(): any {
    // todo 解析Body参数
    const user = { username: 'toimc', password: '123456' } as User;
    // return this.userService.addUser();
    return this.userService.create(user);
  }
  @Get('/update/:id')
  updateUser(@Param() params): any {
    // todo 传递参数id
    // todo 异常处理
    const user = { username: 'newname' } as User;
    return this.userService.update(params.id, user);
  }

  @Get('/delete/:id')
  deleteUser(@Param() params): any {
    // console.log('delete');
    // todo 传递参数id
    return this.userService.remove(params.id);
  }
  @Get('/find/:name')
  find(@Param() params): any {
    // console.log('name', params.name);
    return this.userService.likeFind(params.name);
  }
  @Get('/profile')
  profile(): any {
    return this.userService.findProfile(5);
  }
  @Get('/logsByGroup')
  getLogsByGroup(): any {
    // this.logger.log('getLogsByGroup');
    return this.userService.findLogsByGroup(5);
  }
}
