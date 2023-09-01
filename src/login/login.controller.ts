import { Controller, Post, Body } from '@nestjs/common';
import { UserLoginDto } from 'tools/dtos/user.dto';
import { UserModel } from 'tools/models/user.model';
import { LoginService } from './login.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async createUser(@Body() body: UserLoginDto): Promise<UserModel> {
    return await this.loginService.loginUser(body);
  }
}
