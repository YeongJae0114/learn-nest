import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [UserModule ], // 사용자 조회를 위해 의존
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
