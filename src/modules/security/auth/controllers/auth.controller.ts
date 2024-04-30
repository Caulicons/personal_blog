import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthJtwGuard } from '../guards/auth.local.guard';
import { UserLoginDto } from '../dto/user.login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body()
    user: UserLoginDto,
  ): Promise<{ access_token: string }> {
    return await this.authService.login(user);
  }

  @UseGuards(AuthJtwGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
