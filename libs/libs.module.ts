import { Module } from '@nestjs/common';
import { ResourceService } from './services/resource.service';
import { UserModule } from '../src/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import environment from 'tools/environment/environment';

@Module({
  imports: [
    UserModule,
    LibsModule,
    MongooseModule.forRoot(environment.mongoUrl),
  ],
  providers: [ResourceService],
})
export class LibsModule {}
