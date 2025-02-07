import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';
import { User as TelegramUser } from '@telegram-apps/init-data-node';
import { EKycStatus } from './user.enum';
import { IKycStatus } from './user.models';

@Injectable()
export class UsersService {
  constructor(private repository: PrismaService) {}

  /**
   * Получения статуса пользователя.
   * @param {string} id - id пользователя.
   */
  async getKycStatus(id: string): Promise<IKycStatus> {
    const { role } = await this.getByRole(id);

    return {
      status: EKycStatus.VERIFIED,
      userId: id,
      data: {
        status: EKycStatus.VERIFIED,
        userRole: role
      }
    };
  }

  /**
   * Получения статуса пользователя.
   * @param {string} id - id пользователя.
   */
  async getPermissions(id: string): Promise<IKycStatus> {
    const { role } = await this.getByRole(id);

    return;
  }

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
   * Возвращает роль пользователя из базы данных по id.
   * @param {string} id - id пользователя.
   */
  async getByRole(id: string) {
    return this.repository.user.findUnique({
      where: {
        id
      },
      select: {
        role: true
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
