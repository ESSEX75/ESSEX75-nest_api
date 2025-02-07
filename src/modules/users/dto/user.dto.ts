import { EnumKycUserRoleDto } from '@prisma/client';

export interface UserDto {
  telegramId: number;
  role: EnumKycUserRoleDto;
}
