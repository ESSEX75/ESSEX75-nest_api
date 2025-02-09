import { EnumKycUserRoleDto } from '@prisma/client';
import { EKycStatus } from './user.enum';

export interface IKycStatus {
  status: EKycStatus;
  userId: string;
  data: {
    status: EKycStatus;
    userRole: EnumKycUserRoleDto;
  };
}

export interface IPermissions {
  /** Указывает, может ли пользователь просматривать рестораны. */
  canViewRestaurants: boolean;
  /** Указывает, может ли пользователь добавлять новый ресторан. */
  canAddRestaurant: boolean;
  /** Указывает, может ли пользователь редактировать только свой собственный ресторан. */
  canEditOwnRestaurant: boolean;
  /** Указывает, может ли пользователь редактировать любой ресторан. */
  canModifyAnyRestaurant: boolean;
  /** Указывает, может ли пользователь удалять рестораны. */
  canDeleteOwnRestaurant: boolean;
  /** Указывает, может ли пользователь модерировать рестораны (например, одобрять или отклонять). */
  canApproveRestaurants: boolean;
}
