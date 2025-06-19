import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth-dto';
import { GqlSessionGuard } from './guards/session.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // 로그인
  @Mutation('login')
  async login(
    @Args('input') input: LoginDto,
    @Context() context: any,
  ): Promise<{ message: string }> {
    const { email, password } = input;
    const user = await this.authService.validateUser(email, password);

    // 세션에 사용자 정보 저장
    context.req.session.user = { id: user.id, email: user.email };

    return { message: '로그인 성공' };
  }

  // 로그아웃
  @Mutation('logout')
  logout(@Context() context: any): { message: string } {
    context.req.session.destroy();
    return { message: '로그아웃 되었습니다.' };
  }

  // 로그인 여부 확인
  @UseGuards(GqlSessionGuard)
  @Query('me')
  me(@Context() context: any): { user: any } {
    return { user: context.req.session.user };
  }
}