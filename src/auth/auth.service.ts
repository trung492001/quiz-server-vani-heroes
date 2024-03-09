// auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '../users/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(profile: any): Promise<any> {
    const user = await this.userService.findByPhone(profile.phone);
    if (user) {
      return user;
    }
    return null;
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.userService.findByPhone(signInDto.phone);
    if (user) {
      const checked = await bcrypt.compare(signInDto.password, user.password);
      if (!checked) {
        throw new UnauthorizedException();
      }
      await this.userService.updateLastSignInTime(user);
      const payload = { sub: user.id, phone: user.phone };
      return {
        user: plainToInstance(UserDto, user, { excludeExtraneousValues: true }),
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    return user;
  }
}
