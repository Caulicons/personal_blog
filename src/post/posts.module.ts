import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './entities/posts.entity';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { ThemesService } from 'src/themes/services/themes.service';
import { ThemesModule } from 'src/themes/themes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Posts]), ThemesModule],
  providers: [PostsService, ThemesService],
  controllers: [PostsController],
  exports: [TypeOrmModule],
})
export class PostsModule {}
