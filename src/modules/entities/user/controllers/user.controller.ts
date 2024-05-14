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
import { UpdateUserDto } from '../dto/user.update.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../security/authorization/decorators/roles.decorator';
import { Role } from '../../../security/authorization/enums/role.enum';
import { AuthJtwGuard } from '../../../security/authentication/guards/auth.jwt.guard';
import { RolesGuard } from '../../../security/authorization/guards/roles.guard';

@ApiTags('User')
@Controller('users')
@ApiBearerAuth()
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
    return await this.userService.findByUsername(username);
  }

  @Roles(Role.Admin)
  @UseGuards(AuthJtwGuard, RolesGuard)
  @Get('/email/:email')
  @HttpCode(HttpStatus.OK)
  async findByEmail(
    @Param('email')
    email: string,
  ) {
    return await this.userService.findByEmail(email);
  }

  @UseGuards(AuthJtwGuard)
  @Put()
  @HttpCode(HttpStatus.OK)
  async update(
    @Body()
    user: UpdateUserDto,
    @Request()
    req,
  ) {
    // because I don't pass the id from the body I need catch ID from req pass through the guard
    const idUser = req.user.id;
    return this.userService.update({ ...user, id: idUser });
  }

  @UseGuards(AuthJtwGuard)
  @Delete()
  @HttpCode(HttpStatus.OK)
  async delete(
    @Request()
    req,
  ) {
    return await this.userService.delete(req.user);
  }
}
