// auth.controller.ts
import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignInDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: SignInDto): Promise<AuthDto> {
    const res = await this.authService.signIn(body);
    return res;
  }
}
