import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from '../dto/user.login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthJtwGuard } from '../guards/auth.jwt.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body()
    user: UserLoginDto,
  ): Promise<{ access_token: string }> {
    return await this.authService.login(user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthJtwGuard)
  @Get('profile')
  getProfile(@Request() req) {
    if (!req.user)
      throw new HttpException('You are not logged in', HttpStatus.UNAUTHORIZED);
    return req.user;
  }
}
