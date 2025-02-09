import { Module } from '@nestjs/common';

import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { APP_FILTER } from '@nestjs/core';
import { RestaurantModule } from './modules/restaurant/restaurant.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, AuthModule, RestaurantModule],

  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    }
  ]
})
export class AppModule {}
