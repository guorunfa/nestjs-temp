import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  add() {
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
}
