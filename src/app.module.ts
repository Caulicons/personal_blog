import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './modules/entities/post/posts.module';
import { ThemesModule } from './modules/entities/themes/themes.module';
import { UserModule } from './modules/entities/user/user.module';
import { AuthModule } from './modules/security/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/services/prod.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: ProdService,
      imports: [ConfigModule],
    }),
    UserModule,
    PostsModule,
    ThemesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
