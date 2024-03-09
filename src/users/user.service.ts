import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { UUID } from 'crypto';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async save(user: UserDto): Promise<UserDto> {
    //Check phone number in use
    const existedUser = await this.userRepository.findOneBy({
      phone: user.phone,
    });
    if (existedUser) {
      throw new HttpException(
        'Phone number is already to use',
        HttpStatus.BAD_REQUEST,
      );
    }

    //Hash password
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(user.password, saltOrRounds);
    user.password = hash;

    //Create user
    const savedUser = await this.userRepository.save(user);
    return plainToInstance(UserDto, savedUser, {
      excludeExtraneousValues: true,
    });
  }
  async findById(id: UUID): Promise<UserDto | null> {
    const user = await this.userRepository.findOneBy({ id });
    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }
  async findByPhone(phone: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOneBy({ phone });
    return user;
  }
  async updateLastSignInTime(user: UserEntity): Promise<void> {
    user.lastSignInTime = new Date();
    await this.userRepository.save(user);
  }
}
