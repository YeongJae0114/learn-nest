import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: '올바른 이메일 형식이어야 합니다.' })
  email: string;

  @IsNotEmpty({ message: '비밀번호는 필수입니다.' })
  password: string;
}
