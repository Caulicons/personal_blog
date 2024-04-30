import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './modules/entities/post/posts.module';
import { ThemesModule } from './modules/entities/themes/themes.module';
import { UserModule } from './modules/entities/user/user.module';
import { AuthModule } from './modules/security/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_personal_blog',
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    PostsModule,
    ThemesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
