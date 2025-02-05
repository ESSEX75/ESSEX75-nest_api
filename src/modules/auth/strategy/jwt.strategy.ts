import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Извлекаем токен из заголовка
      ignoreExpiration: false, // Проверяем истечение срока действия токена
      secretOrKey: configService.get<string>('JWT_SECRET') // Берем секретный ключ из .env
    });
  }

  async validate(payload: { id: string }) {
    const user = await this.usersService.getById(payload.id);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user; // Добавляем пользователя в req.user
  }
}
