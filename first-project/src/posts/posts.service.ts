import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { UserService } from '../users/users.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly userService: UserService,
  ) {}

  // 게시글 생성
  async create(
    createPostDto: CreatePostDto,
    userId: number,
  ): Promise<PostResponseDto> {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const post = this.postRepository.create({ ...createPostDto, author: user });
    const savePost = await this.postRepository.save(post);
    return new PostResponseDto(savePost);
  }

  // 게시글 모두 조회
  async findAll(): Promise<PostResponseDto[]> {
    const posts = await this.postRepository.find({ relations: ['author'] });
    return posts.map((post) => new PostResponseDto(post));
  }

  // 게시글 상세 조회
  async findOne(id: number): Promise<PostResponseDto> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }
    return new PostResponseDto(post);
  }

  // 게시글 수정
  async updatePost(
    id: number,
    dto: CreatePostDto,
    userId: number,
  ): Promise<PostResponseDto> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    if (post.author.id !== userId) {
      throw new ForbiddenException('본인의 게시글만 수정할 수 있습니다.');
    }
    post.title = dto.title;
    post.content = dto.content;
    const savePost = await this.postRepository.save(post);

    return new PostResponseDto(savePost);
  }

  // 게시글 삭제
  async removePost(id: number, userId: number): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    if (post.author.id !== userId) {
      throw new ForbiddenException('본인의 게시글만 삭제할 수 있습니다.');
    }

    await this.postRepository.remove(post);
  }
}
