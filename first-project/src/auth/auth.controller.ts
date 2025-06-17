import {
  Controller,
  Post,
  Body,
  Session,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth-dto';
import { SessionGuard } from './guards/session.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 로그인
  @Post('login')
  async login(@Body() body: LoginDto, @Session() session: any) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);

    session.user = { id: user.id, email: user.email };
    return { message: '로그인 성공' };
  }

  // 로그아웃
  @Post('logout')
  logout(@Session() session: any) {
    session.destroy();
    return { message: '로그아웃 되었습니다.' };
  }

  // 로그인 여부 확인
  @UseGuards(SessionGuard)
  @Get('me')
  me(@Session() session: any) {
    return { user: session.user };
  }
}
