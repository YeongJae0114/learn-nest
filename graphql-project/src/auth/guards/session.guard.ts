import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlSessionGuard implements CanActivate {
  private readonly whitelist = [
    'login',         // 로그인 쿼리 or mutation 이름
    'createUser',    // 회원가입 mutation 이름
    'posts',         // 게시글 목록 조회
    'post',          // 게시글 단일 조회
  ];

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req; // GraphQL req 접근
    const info = ctx.getInfo();

    const operationName = info.fieldName; // 현재 실행되는 Query / Mutation 이름
    const isWhitelisted = this.whitelist.includes(operationName);

    if (isWhitelisted) {
      return true;
    }

    if (!req.session || !req.session.user) {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }

    return true;
  }
}