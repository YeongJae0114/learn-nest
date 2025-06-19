import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('user')
  findOne(@Args('id', { type: () => Int }) id: number): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Query('users')
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Mutation('createUser')
  create(@Args('input') input: any): Promise<{ message: string }> {
    return this.userService.create(input);
  }
}