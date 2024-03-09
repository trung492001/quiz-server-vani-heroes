import { Exclude, Expose, Type } from 'class-transformer';
import { UserDto } from '../users/user.dto';
import { IsPhoneNumber, IsString } from 'class-validator';

@Exclude()
export class AuthDto {
  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  access_token: string;

  @Expose()
  refresh_token: string;
}

export class SignInDto {
  @IsPhoneNumber()
  phone: string;

  @IsString()
  password: string;
}
