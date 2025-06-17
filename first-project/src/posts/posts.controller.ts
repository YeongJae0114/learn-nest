import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Session,
} from '@nestjs/common';
import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PostResponseDto } from './dto/post-response.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // 게시글 작성
  @Post()
  async create(
    @Body() dto: CreatePostDto,
    @Session() session: any,
  ): Promise<PostResponseDto> {
    return this.postService.create(dto, session.user.id);
  }

  // 전체 게시글 조회
  @Get()
  async findAll(): Promise<PostResponseDto[]> {
    return this.postService.findAll();
  }

  // 단일 게시글 조회
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<PostResponseDto> {
    return this.postService.findOne(id);
  }

  // 게시글 수정
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreatePostDto,
    @Session() session: any,
  ): Promise<PostResponseDto> {
    return this.postService.updatePost(id, body, session.user.id);
  }

  // 게시글 삭제
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Session() session: any,
  ): Promise<void> {
    await this.postService.removePost(id, session.user.id);
  }
}
