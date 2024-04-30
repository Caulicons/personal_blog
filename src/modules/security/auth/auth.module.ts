import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { Bcrypt } from './bcrypt/brypt';
import { UserModule } from '../../entities/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants.ts/constants';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '365d' },
      verifyOptions: { ignoreExpiration: false },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, Bcrypt],
  exports: [Bcrypt],
})
export class AuthModule {}
