import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/user.update.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body()
    user: User,
  ) {
    return this.userService.create(user);
  }

  /*   @Post('login')
  async login() {
    return await this.userService.login();
  } */

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.userService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id')
    id: number,
  ) {
    return this.userService.findOne(id);
  }

  @Get('/username/:username')
  @HttpCode(HttpStatus.OK)
  async findByUsername(
    @Param('username')
    username: string,
  ) {
    return this.userService.findByUsername(username);
  }

  @Get('/email/:email')
  @HttpCode(HttpStatus.OK)
  async findByEmail(
    @Param('email')
    email: string,
  ) {
    return this.userService.findByEmail(email);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async update(
    @Body()
    user: UpdateUserDto,
  ) {
    return this.userService.update(user);
  }
}
