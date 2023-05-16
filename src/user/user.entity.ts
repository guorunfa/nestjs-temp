import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn() // 主键
  id: number;

  @Column() // 字段
  username: string;

  @Column()
  password: string;
  logs: any;

  @Column()
  age: number;
  // 关联表，(profile) => profile.user关联表里的字段
  @OneToOne(() => Profile, (profile) => profile.user)
  profile;
}
