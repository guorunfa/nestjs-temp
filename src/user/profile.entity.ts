import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gender: number;
  @Column()
  photo: string;
  @Column()
  adress: string;
  @OneToOne(() => User) // 一对一关联 -> 关联的表
  @JoinColumn() // 一对一关联，关联字段
  user: User;
}
