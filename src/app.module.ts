import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import environment from 'tools/environment/environment';
import { AllExceptionFilter } from 'libs/filters/all-exception.filter';
import { TotalModule } from './total/total.module';
import { LoginModule } from './login/login.module';
import { RoleModule } from './role/role.module';
import { TokenMiddleware } from 'libs/middlewares/token.middleware';
import { AppService } from './app.service';
import { APP_GUARD, APP_INTERCEPTOR, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from 'libs/guards/auth.guard';
import { GroupModule } from './group/group.module';
import { AppController } from './app.controller';
import { LoggingInterceptor } from '../libs/interception';
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
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
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
