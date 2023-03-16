import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
  logs: any;

  // 关联表，(profile) => profile.user关联表里的字段
  @OneToOne(() => Profile, (profile) => profile.user)
  profile;
}
