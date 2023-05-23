import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Logs } from '../logs/logs.entity';
import { Roles } from '../roles/roles.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() // 主键
  id: number;

  @Column() // 字段
  username: string;

  @Column()
  password: string;

  @Column()
  age: number;
  // 关联表，(profile) => profile.user关联表里的字段
  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
  @OneToMany(() => Logs, (logs) => logs.user)
  logs: Logs[];
  @ManyToMany(() => Roles, (roles) => roles.users)
  @JoinTable({ name: 'user_roles' })
  roles: Roles[];
}
