import { Module } from '@nestjs/common';
import { ThemesService } from './services/themes.service';
import { ThemesController } from './controller/themes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from './entities/theme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Theme])],
  controllers: [ThemesController],
  providers: [ThemesService],
  exports: [TypeOrmModule],
})
export class ThemesModule {}
