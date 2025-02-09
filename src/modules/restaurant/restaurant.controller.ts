import { Controller, Get, Post, Patch, Param, Body, Req } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/restaurant.dto';
import { Auth } from 'src/common/decorators/auth.decorator';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Auth()
@ApiBearerAuth()
@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  async getAllRestaurants() {
    return this.restaurantService.getAllRestaurants();
  }

  @Get(':id')
  async getRestaurantById(@Param('id') id: string) {
    return this.restaurantService.getRestaurantById(id);
  }

  @Post()
  async createRestaurant(@CurrentUser('id') id: string, @Body() dto: CreateRestaurantDto) {
    return this.restaurantService.createRestaurant(id, dto);
  }

  // @Patch(':id/approve')
  // async approveRestaurant(@Param('id') id: string) {
  //   return this.restaurantService.approveRestaurant(id);
  // }
}
