import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Logs } from '../logs/logs.entity';
export declare class UserService {
    private readonly user;
    private readonly logsRepository;
    constructor(user: Repository<User>, logsRepository: Repository<Logs>);
    add(): Promise<User>;
    findAll(): Promise<User[]>;
    find(username: string): Promise<User>;
    likeFind(username: string): Promise<User[]>;
    create(user: User): Promise<User>;
    update(id: number, user: Partial<User>): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findProfile(id: number): Promise<User>;
    findLogsByGroup(id: number): Promise<any[]>;
}
