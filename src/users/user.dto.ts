import { Expose } from 'class-transformer';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class UserDto {
  @Expose()
  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  password: string;

  @Expose()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
