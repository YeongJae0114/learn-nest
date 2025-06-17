import { Post } from '../entities/post.entity';

export class PostResponseDto {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  author: {
    id: number;
    name: string;
  };
  constructor(post: Post) {
    this.id = post.id;
    this.title = post.title;
    this.content = post.content;
    this.createdAt = post.createdAt;

    if (post.author) {
      this.author = {
        id: post.author.id,
        name: post.author.name,
      };
    }
  }
}
