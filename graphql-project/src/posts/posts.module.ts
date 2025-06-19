import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UserModule } from '../users/users.module';
import { PostService } from './posts.service';
import { UserService } from '../users/users.service';
import { PostResolver } from './posts.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UserModule],
  providers: [PostService, UserService, PostResolver],
})
export class PostModule {}
