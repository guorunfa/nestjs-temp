import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  add() {
    const data = new User();
    data.username = '小雅';
    data.password = '123';
    return this.userRepository.save(data);
  }
  findAll() {
    return this.userRepository.find();
  }
  find(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
  async create(user: User) {
    const userTmp = await this.userRepository.create(user);
    return this.userRepository.save(userTmp);
  }
  async update(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }
  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
