import { Body, Controller, HttpCode, Post, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { EnumKycUserRoleDto } from '@prisma/client';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  /**
   * Контроллер отвечающий за создание JWT токена.
   * @param {string} initData - Инициализационные данные пользователя.
   */
  @HttpCode(200)
  @Post('auth_refresh')
  @ApiBody({ type: RefreshTokenDto })
  async authRefresh(@Body('initData') initData: string) {
    const { user: telegramUser } = await this.authService.validateUser(initData);
    const telegramId = telegramUser.id;

    let user = await this.usersService.getByTelegramId(telegramId);
    if (!user) {
      user = await this.usersService.createUser({ telegramId, role: EnumKycUserRoleDto.GUEST });
    }

    // Генерируем токены
    const { accessToken, refreshToken, expiresAt } = this.authService.issueTokens(user.id);

    return {
      session_id: uuidv4(),
      jwt: accessToken,
      refresh_token: refreshToken,
      access_token_expires_at: expiresAt.toISOString()
    };
  }
}
