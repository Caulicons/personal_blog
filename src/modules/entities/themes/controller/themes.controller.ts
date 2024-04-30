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
import { AuthJtwGuard } from '../../../security/auth/guards/auth.local.guard';

/* 
TODO - Implement Themes Controller
*/
@UseGuards(AuthJtwGuard)
@Controller('themes')
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}
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

  @Put(':id')
  async update(
    @Param('id')
    id: number,
    @Body()
    theme: Theme,
  ) {
    return await this.themesService.update(id, theme);
  }

  @Delete(':id')
  async delete(
    @Param('id')
    id: number,
  ): Promise<Theme> {
    return await this.themesService.delete(id);
  }
}
