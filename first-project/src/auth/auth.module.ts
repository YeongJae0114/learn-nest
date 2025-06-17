import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/users.module';

@Module({
  imports: [UserModule], // 사용자 조회를 위해 의존
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
