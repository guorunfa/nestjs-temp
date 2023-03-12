import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get()
  getUsers(): any {
    return this.userService.findAll();
    // return this.userService.getUsers();
  }

  @Post()
  addUser(): any {
    // todo 解析Body参数
    const user = { username: 'toimc', password: '123456' } as User;
    // return this.userService.addUser();
    return this.userService.create(user);
  }
  @Patch()
  updateUser(): any {
    // todo 传递参数id
    // todo 异常处理
    const user = { username: 'newname' } as User;
    return this.userService.update(1, user);
  }

  @Delete()
  deleteUser(): any {
    // todo 传递参数id
    return this.userService.remove(1);
  }
}
