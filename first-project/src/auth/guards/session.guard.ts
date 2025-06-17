import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class SessionGuard implements CanActivate {
  private readonly whitelist = [
    { path: '/auth/login', method: 'POST' },
    { path: '/user/signup', method: 'POST' },
    { path: '/posts', method: 'GET' }, // 게시글 전체 조회는 누구나 가능
    { path: '/posts/:id', method: 'GET' }, // 게시글 상세 조회도 허용
  ];
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const reqPath = req.route.path; // Nest는 path를 동적으로 저장함 (e.g. '/posts/:id')
    const reqMethod = req.method;

    const isWhitelisted = this.whitelist.some(
      (item) => item.path === reqPath && item.method === reqMethod,
    );

    if (isWhitelisted) {
      return true;
    }

    if (!req.session || !req.session.user) {
      throw new UnauthorizedException('로그인이 필요합니다.');
    }

    return true;
  }
}
