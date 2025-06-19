import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { PostService } from './posts.service';
import { PostResponseDto } from './dto/post-response.dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { CreatePostDto } from './dto/create-post.dto';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query('posts')
  findAll(): Promise<PostResponseDto[]> {
    return this.postService.findAll();
  }

  @Query('post')
  findOne(@Args('id', { type: () => Int }) id: number): Promise<PostResponseDto> {
    return this.postService.findOne(id);
  }

  @Mutation('createPost')
  create(
    @Args('input') input: CreatePostDto,
    @Context() context: any,
  ): Promise<PostResponseDto> {
    const userId = context.req.session.user.id;
    return this.postService.create(input, userId);
  }

  @Mutation('updatePost')
  update(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePostDto,
    @Context() context: any,
  ): Promise<PostResponseDto> {
    const userId = context.req.session.user.id;
    return this.postService.updatePost(id, input, userId);
  }

  @Mutation('deletePost')
  async remove(
    @Args('id', { type: () => Int }) id: number,
    @Context() context: any,
  ): Promise<boolean> {
    const userId = context.req.session.user.id;
    await this.postService.removePost(id, userId);
    return true;
  }
}