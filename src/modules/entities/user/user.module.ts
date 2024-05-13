import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { Bcrypt } from '../../security/authentication/bcrypt/brypt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, Bcrypt],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
