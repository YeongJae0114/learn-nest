import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<{ message: string }> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10); // saltRounds = 10
    const isDuplicate = await this.isEmailTaken(createUserDto.email);
    if (isDuplicate) {
      throw new ConflictException('이미 가입된 이메일입니다.');
    }

    // DTO에서 받은 데이터를 기반으로 유저 엔티티 생성
    const user = this.userRepository.create({
      ...createUserDto, // password 만 덮어쓰기 위해
      password: hashedPassword, // 평문 비밀번호 대신 해시 저장
    });

    await this.userRepository.save(user);

    return { message: '회원가입이 완료되었습니다.' };
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: number, updateData: Partial<User>): Promise<User> {
    const user = await this.findOne(id);
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  async isEmailTaken(email: string): Promise<boolean> {
    const user = await this.userRepository.findOneBy({ email });
    return !!user;
  }
}
