import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { GqlSessionGuard } from './auth/guards/session.guard';
import { PostModule } from './posts/posts.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';



@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,         // 🚩 v10 이상 필수
      typePaths: ['./**/*.graphql'],
      playground: true,
    }),

    // TypeORM 설정
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'dudwo',
      database: 'test_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 개발용: 자동 마이그레이션 (운영에서는 false)
      dropSchema: true,
    }),
    UserModule,
    AuthModule,
    PostModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlSessionGuard,
    },
  ],
})
export class AppModule {}
