import { Controller, Get, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Auth()
@ApiBearerAuth()
@Controller('user')
@ApiTags('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @HttpCode(200)
  @Get('get-kyc')
  async getKYCStatus(@CurrentUser('id') id: string): Promise<any> {
    const { data, status, userId } = await this.userService.getKycStatus(id);
    const { status: dataStatus, userRole } = data;

    return {
      status,
      user_id: userId,
      data: {
        status: dataStatus,
        user_role: userRole
      }
    };
  }

  @HttpCode(200)
  @Get('permissions')
  async getPermissions(@CurrentUser('id') id: string): Promise<any> {
    const {
      canAddRestaurant,
      canApproveRestaurants,
      canDeleteOwnRestaurant,
      canEditOwnRestaurant,
      canModifyAnyRestaurant,
      canViewRestaurants
    } = await this.userService.getPermissions(id);

    return {
      can_view_restaurants: canViewRestaurants,
      can_add_restaurant: canAddRestaurant,
      can_edit_own_restaurant: canEditOwnRestaurant,
      can_modify_any_restaurant: canModifyAnyRestaurant,
      can_delete_own_restaurant: canDeleteOwnRestaurant,
      can_approve_restaurants: canApproveRestaurants
    };
  }
}
