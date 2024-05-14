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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../security/authorization/decorators/roles.decorator';
import { Role } from '../../../security/authorization/enums/role.enum';
import { RolesGuard } from '../../../security/authorization/guards/roles.guard';
import { ThemeCreateDTO } from '../dto/theme.create.dto';
import { ThemeUpdateDTO } from '../dto/theme.update.dto';

@ApiTags('Theme')
@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthJtwGuard, RolesGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    theme: ThemeCreateDTO,
  ) {
    return this.themesService.create(theme);
  }

  @ApiResponse({
    type: [Theme],
    description: 'Get all themes',
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    return this.themesService.findAll();
  }

  @ApiResponse({
    type: Theme,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param('id')
    id: number,
  ): Promise<Theme> {
    return this.themesService.findById(id);
  }

  @ApiResponse({
    type: Theme,
  })
  @Get('/name/:name')
  @HttpCode(HttpStatus.OK)
  async findByName(
    @Param('name')
    name: string,
  ): Promise<Theme[]> {
    return await this.themesService.findByName(name);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthJtwGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id')
    id: number,
    @Body()
    theme: ThemeUpdateDTO,
  ) {
    return await this.themesService.update(id, theme);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @UseGuards(AuthJtwGuard, RolesGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(
    @Param('id')
    id: number,
  ) {
    return await this.themesService.delete(id);
  }
}
