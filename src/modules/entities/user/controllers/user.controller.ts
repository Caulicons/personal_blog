import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { UserUpdateDTO } from '../dto/user.update.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthJtwGuard } from '../../../security/authentication/guards/auth.jwt.guard';
import { UserCreateDTO } from '../dto/user.create.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Body()
    user: UserCreateDTO,
  ) {
    return this.userService.create(user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: User, isArray: true })
  async findAll() {
    return this.userService.findAll();
  }

  @ApiResponse({ type: User })
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id')
    id: number,
  ) {
    return this.userService.findOne(id);
  }

  @ApiResponse({ type: User })
  @Get('/username/:username')
  @HttpCode(HttpStatus.OK)
  async findByUsername(
    @Param('username')
    username: string,
  ) {
    return await this.userService.findByUsername(username);
  }

  @ApiResponse({ type: User })
  @Get('/email/:email')
  @HttpCode(HttpStatus.OK)
  async findByEmail(
    @Param('email')
    email: string,
  ) {
    return await this.userService.findByEmail(email);
  }

  @ApiBearerAuth()
  @ApiResponse({ type: UserUpdateDTO })
  @UseGuards(AuthJtwGuard)
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(
    @Body()
    user: UserUpdateDTO,
    @Request()
    req,
  ) {
    // because I don't pass the id from the body I need catch ID from req pass through the guard
    const idUser = req.user.id;
    return this.userService.update({ ...user, id: idUser });
  }

  @ApiBearerAuth()
  @UseGuards(AuthJtwGuard)
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Request()
    req,
  ) {
    return await this.userService.delete(req.user);
  }
}
