import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입
  @Post('signup')
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  // 모든 user 조회
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // user 단건 조회
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // user 정보 수정
  @Put(':id')
  update(@Param('id') id: string, @Body() body: CreateUserDto) {
    return this.userService.update(+id, body);
  }

  // user 삭제
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
