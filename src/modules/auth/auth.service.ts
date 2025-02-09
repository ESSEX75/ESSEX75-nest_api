import { ForbiddenException, Injectable } from '@nestjs/common';
import { parse, validate } from '@telegram-apps/init-data-node';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './auth.types';

@Injectable()
export class AuthService {
  EXPIRE_DAY_REFRESH_TOKEN = 1;
  REFRESH_TOKEN_NAME = 'refreshToken';

  constructor(private jwt: JwtService) {}

  /**
   * Сервис валидации инициализационных данных пользователя.
   * @param { string } initData - Инициализационные данные пользователя.
   */
  async validateUser(initData: string) {
    if (!initData) {
      throw new ForbiddenException('Отсутствуют инициализационные данные Telegram');
    }

    try {
      validate(initData, process.env.TELEGRAM_BOT_TOKEN, {
        expiresIn: 0 //TODO - поменять на нормальное значение.
      });

      return parse(initData);
    } catch (err) {
      throw new ForbiddenException('Неверный Telegram init data');
    }
  }

  /**
   * Сервис для создания Refresh-токена пользователя.
   * @param { string } userId - id пользователя.
   */
  issueTokens(userId: string): AuthResponseDto {
    const data = { id: userId };

    // Время жизни токенов
    const accessTokenExpiresIn = 3600; // 1 час в секундах
    const refreshTokenExpiresIn = process.env.EXPIRES_IN;

    const accessToken = this.jwt.sign(data, {
      expiresIn: `${accessTokenExpiresIn}s`
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: refreshTokenExpiresIn
    });

    // Вычисляем время истечения токена
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + accessTokenExpiresIn);

    return {
      accessToken,
      refreshToken,
      expiresAt
    };
  }
}
