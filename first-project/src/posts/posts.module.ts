import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UserModule } from '../users/users.module';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { UserService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), UserModule],
  providers: [PostService, UserService],
  controllers: [PostController],
})
export class PostModule {}
