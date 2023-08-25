import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ResourceService } from 'libs/services/resource.service';
import { Model } from 'mongoose';
import { UserCreateDto, UserUpdateDto } from 'tools/dtos/user.dto';
import { UserModel } from 'tools/models/user.model';
import environment from 'tools/environment/environment';

const bcrypt = require('bcrypt');
const saltRounds = 10;
const hashtext = environment.hastText;

@Injectable() // Diğer controller'ra veya servislere erişim saglayabilmesi için inject edebilecek duruma gelmesi saglar.
export class UserService extends ResourceService<
  UserModel,
  UserCreateDto,
  UserUpdateDto
> {
  constructor(@InjectModel('User') userMongo: Model<UserModel>) {
    super(userMongo);
  }

  async covertToHash(value: string) {
    let hashPwd;
    await bcrypt.hash(`${hashtext}${value}`, saltRounds).then((hash) => {
      hashPwd = hash;
    });
    return await hashPwd;
  }
  async compareHashes(password, hased) {
    const match = await bcrypt.compareSync(`${hashtext}${password}`, hased);
    return await match;
  }
}
