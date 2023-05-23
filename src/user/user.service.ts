import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './user.entity';
import { Logs } from '../logs/logs.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(Logs) private readonly logsRepository: Repository<Logs>,
  ) {}

  add() {
    // console.log(this.logsRepository);
    const data = new User();
    data.username = '小率';
    data.password = '123';
    return this.user.save(data);
  }
  findAll() {
    return this.user.find();
  }
  find(username: string) {
    return this.user.findOne({ where: { username } });
  }
  likeFind(username: string) {
    return this.user.find({
      where: { username: Like(`%${username}%`) },
    });
  }
  async create(user: User) {
    const userTmp = await this.user.create(user);
    return this.user.save(userTmp);
  }
  async update(id: number, user: Partial<User>) {
    return this.user.update(id, user);
  }
  remove(id: number) {
    return this.user.delete(id);
  }
  findProfile(id: number) {
    return this.user.findOne({
      where: {
        id,
      },
      relations: {
        profile: true,
      },
    });
  }
  // findLogsByGroup(id: number) {
  //   return this.logsRepository
  //     .createQueryBuilder('logs')
  //     .select('logs.result', 'result')
  //     .addSelect('COUNT(logs.result)', 'count')
  //     .leftJoinAndSelect('logs.user', 'user')
  //     .where('logs.userId = :id', { id })
  //     .groupBy('logs.result')
  //     .getRawMany();
  // }
}
