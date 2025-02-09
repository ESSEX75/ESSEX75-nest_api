import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateRestaurantDto } from './dto/restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllRestaurants() {
    return this.prisma.restaurant.findMany({
      where: { isApproved: true } // Показываем только одобренные
    });
  }

  async getRestaurantById(id: string) {
    const restaurant = await this.prisma.restaurant.findUnique({ where: { id } });
    if (!restaurant) throw new NotFoundException('Ресторан не найден');
    return restaurant;
  }

  async createRestaurant(userId: string, dto: CreateRestaurantDto) {
    return this.prisma.restaurant.create({
      data: {
        ...dto,
        ownerId: userId,
        isApproved: false // Новые рестораны должны быть одобрены админом
      }
    });
  }

  // валидация роли должна быть в api
  // async approveRestaurant(restaurantId: string, userRole: EnumKycUserRoleDto) {
  //   if (userRole !== EnumKycUserRoleDto.ADMIN) {
  //     throw new ForbiddenException('Только администратор может одобрять рестораны');
  //   }

  //   return this.prisma.restaurant.update({
  //     where: { id: restaurantId },
  //     data: { isApproved: true },
  //   });
  // }

  // async updateRestaurant(userId: string, restaurantId: string, dto: UpdateRestaurantDto, userRole: EnumKycUserRoleDto) {
  //   const restaurant = await this.prisma.restaurant.findUnique({ where: { id: restaurantId } });
  //   if (!restaurant) throw new NotFoundException('Ресторан не найден');

  //   // MASTER может редактировать только свои рестораны
  //   if (userRole === EnumKycUserRoleDto.MASTER && restaurant.ownerId !== userId) {
  //     throw new ForbiddenException('Вы не можете редактировать этот ресторан');
  //   }

  //   return this.prisma.restaurant.update({
  //     where: { id: restaurantId },
  //     data: { ...dto },
  //   });
  // }
}
