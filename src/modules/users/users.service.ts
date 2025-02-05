import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';
import { User as TelegramUser } from '@telegram-apps/init-data-node';
// import { toString } from 'lodash-es';

@Injectable()
export class UsersService {
  constructor(private repository: PrismaService) {}

  /**
   * Поиск пользователя в базе данных по id.
   * @param {string} id - id пользователя.
   */
  async getById(id: string) {
    return this.repository.user.findUnique({
      where: {
        id
      }
    });
  }

  /**
   * Поиск пользователя в базе данных по id telegram.
   * @param { number } telegramId - Данные пользователя из telegram.
   */
  async getByTelegramId(telegramId: number) {
    return this.repository.user.findUnique({
      where: {
        telegramId
      }
    });
  }

  /**
   * Поиск пользователя в базе данных по id telegram.
   * @param { UserDto } user - Данные пользователя.
   */
  async createUser(user: UserDto) {
    return this.repository.user.create({
      data: user
    });
  }
}
