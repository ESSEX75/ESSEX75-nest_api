import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { EKycStatus } from './user.enum';
import { IKycStatus, IPermissions } from './user.types';
import { CreateUserDto } from './dto/user.dto';
import { EnumKycUserRoleDto } from '@prisma/client';

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
  async getPermissions(id: string): Promise<IPermissions> {
    const { role } = await this.getByRole(id);
    const CAN_VIEW_RESTAURANTS = true;
    let canModifyAnyRestaurant = false;
    let canAddRestaurant: boolean;
    let canEditOwnRestaurant: boolean;
    let canDeleteOwnRestaurant: boolean;
    let canApproveRestaurants: boolean;

    switch (role) {
      case EnumKycUserRoleDto.ADMIN:
        (canAddRestaurant = true),
          (canEditOwnRestaurant = true),
          (canDeleteOwnRestaurant = true),
          (canModifyAnyRestaurant = true),
          (canApproveRestaurants = true);
        break;
      case EnumKycUserRoleDto.MASTER:
        (canAddRestaurant = true),
          (canEditOwnRestaurant = true),
          (canDeleteOwnRestaurant = true),
          (canModifyAnyRestaurant = false),
          (canApproveRestaurants = false);
        break;
      case EnumKycUserRoleDto.GUEST:
        (canAddRestaurant = false),
          (canEditOwnRestaurant = false),
          (canDeleteOwnRestaurant = false),
          (canModifyAnyRestaurant = false),
          (canApproveRestaurants = false);
        break;
      default:
        (canAddRestaurant = false),
          (canEditOwnRestaurant = false),
          (canDeleteOwnRestaurant = false),
          (canModifyAnyRestaurant = false),
          (canApproveRestaurants = false);
        break;
    }

    return {
      canViewRestaurants: CAN_VIEW_RESTAURANTS,
      canAddRestaurant,
      canEditOwnRestaurant,
      canDeleteOwnRestaurant,
      canModifyAnyRestaurant,
      canApproveRestaurants
    };
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
   * Создание пользователя.
   * @param { User } user - Данные пользователя.
   */
  async createUser(user: CreateUserDto) {
    return this.repository.user.create({
      data: user
    });
  }
}
