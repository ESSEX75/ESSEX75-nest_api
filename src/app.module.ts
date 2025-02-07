import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/dto/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule],

  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ]
})
export class AppModule {}
