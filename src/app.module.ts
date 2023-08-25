import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import environment from 'tools/environment/environment';
import { TotalModule } from './total/total.module';
import { LoginModule } from './login/login.module';
import { TokenMiddleware } from 'libs/middlewares/token.middleware';

@Module({
  imports: [
    UserModule,
    TotalModule,
    LoginModule,
    MongooseModule.forRoot(environment.mongoUrl),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
