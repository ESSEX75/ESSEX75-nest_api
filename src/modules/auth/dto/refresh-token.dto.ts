import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    example: process.env.INIT_DATA
  })
  initData: string;
}
