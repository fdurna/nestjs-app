import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsDateString, IsEmail } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @Length(2, 20)
  @ApiProperty()
  name: string;
  @Length(2, 25)
  @ApiProperty()
  surname: string;
  @ApiProperty()
  password: string;
  @IsEmail()
  @ApiProperty()
  email: string;
  @ApiProperty()
  //@IsDateString()
  birthdate: string;
}

export class UserUpdateDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  surname: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  birthdate: string;
}

export class UserLoginDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
