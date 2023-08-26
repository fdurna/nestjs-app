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
import { RoleModule } from './role/role.module';
import { TokenMiddleware } from 'libs/middlewares/token.middleware';
import { AppService } from './app.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'libs/guards/auth.guard';
import { GroupModule } from './group/group.module';
import { AppController } from './app.controller';
@Module({
  imports: [
    UserModule,
    TotalModule,
    LoginModule,
    RoleModule,
    GroupModule,
    MongooseModule.forRoot(environment.mongoUrl),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
