import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto, UserUpdateDto } from 'tools/dtos/user.dto';
import { UserModel } from 'tools/models/user.model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'libs/decorators/role.decorators';

@ApiTags('User')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @Roles('Developer')
  async createUser(@Body() body: UserCreateDto): Promise<UserModel> {
    body.password = await this.userService.covertToHash(body.password);
    return await this.userService.create(body);
  }

  @Get()
  @Roles('Admin')
  async getAllUsers(): Promise<UserModel[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getUser(@Param() params): Promise<UserModel[]> {
    return await this.userService.findOne(params.id);
  }

  @Put(':id')
  async updateUser(
    @Param() id: string,
    @Body() userUpdateDto: UserUpdateDto,
  ): Promise<UserModel> {
    return await this.userService.update(id, userUpdateDto);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string): Promise<UserModel> {
    return await this.userService.delete(id);
  }
}
