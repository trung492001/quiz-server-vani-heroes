import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { UUID } from 'crypto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: UserDto): Promise<UserDto> {
    return await this.userService.save(user);
  }

  @UseGuards(AuthGuard('oauth2'))
  @Get(':id')
  async getUserById(@Param('id') id: UUID): Promise<UserDto> {
    return await this.userService.findById(id);
  }
}
