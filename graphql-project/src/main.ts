import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // DTO 유효성 검사 작동
  app.useGlobalPipes(new ValidationPipe());

  // 1. 쿠키 파서 등록
  app.use(cookieParser());

  // 2. express-session 등록 (메모리 기반)
  app.use(
    session({
      secret: 'my-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀  Application is running on: ${await app.getUrl()}`);
}
bootstrap();
