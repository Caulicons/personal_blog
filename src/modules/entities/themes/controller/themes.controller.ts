import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ThemesService } from '../services/themes.service';
import { Theme } from '../entities/theme.entity';
import { AuthJtwGuard } from '../../../security/authentication/guards/auth.jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../security/authorization/decorators/roles.decorator';
import { Role } from '../../../security/authorization/enums/role.enum';
import { RolesGuard } from '../../../security/authorization/guards/roles.guard';

@ApiTags('Theme')
@Controller('themes')
@ApiBearerAuth()
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}
  @Roles(Role.Admin)
  @UseGuards(AuthJtwGuard, RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    theme: Theme,
  ) {
    return this.themesService.create(theme);
  }
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.themesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param('id')
    id: number,
  ): Promise<Theme> {
    return this.themesService.findById(id);
  }
  @Get('/name/:name')
  @HttpCode(HttpStatus.OK)
  async findByName(
    @Param('name')
    name: string,
  ): Promise<Theme[]> {
    return await this.themesService.findByName(name);
  }

  @UseGuards(AuthJtwGuard)
  @Put(':id')
  async update(
    @Param('id')
    id: number,
    @Body()
    theme: Theme,
  ) {
    return await this.themesService.update(id, theme);
  }

  @UseGuards(AuthJtwGuard)
  @Delete(':id')
  async delete(
    @Param('id')
    id: number,
  ): Promise<Theme> {
    return await this.themesService.delete(id);
  }
}
