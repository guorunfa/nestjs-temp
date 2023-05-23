import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Logs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;
  @Column()
  methods: string;
  @Column()
  data: string;
  @Column()
  result: string;
  @ManyToOne(() => User, (user) => user.logs) // 多对一关联 -> 关联的表
  @JoinColumn() //可以省略
  user: User;
}
