import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date; // 자동 생성됨

  @UpdateDateColumn()
  updatedAt: Date; // 수정 시간 (자동 갱신)

  @ManyToOne(() => User, (user) => user.posts)
  author: User;
}
