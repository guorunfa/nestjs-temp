import { LoggerService } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
export declare class UserController {
    private userService;
    private configService;
    private readonly logger;
    constructor(userService: UserService, configService: ConfigService, logger: LoggerService);
    getUsers(): any;
    addUser(): any;
    updateUser(params: any): any;
    deleteUser(params: any): any;
    find(params: any): any;
    profile(): any;
    getLogsByGroup(): any;
}
