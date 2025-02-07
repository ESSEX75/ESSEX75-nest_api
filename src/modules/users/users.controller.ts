import { Controller, Get, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';

@Controller('user')
@ApiTags('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Auth()
  @HttpCode(200)
  @Get(':userId')
  async getKYCStatus(@CurrentUser('id') id: string): Promise<any> {
    return await this.userService.getKycStatus(id);
  }
}
