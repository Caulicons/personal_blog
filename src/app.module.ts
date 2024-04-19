import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './post/entities/posts.entity';
import { PostsModule } from './post/posts.module';
import { ThemesModule } from './themes/themes.module';
import { Theme } from './themes/entities/theme.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_personal_blog',
      entities: [Posts, Theme],
      synchronize: true,
    }),
    PostsModule,
    ThemesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
