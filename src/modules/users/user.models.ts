import { EnumKycUserRoleDto } from 'node_modules/@prisma/client/default';
import { EKycStatus } from './kyc.enum';

export interface IKycStatus {
  status: EKycStatus;
  userId: string;
  data: {
    status: EKycStatus;
    userRole: EnumKycUserRoleDto;
  };
}
