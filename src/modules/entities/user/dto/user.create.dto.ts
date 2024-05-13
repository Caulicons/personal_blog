import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { IsEmpty } from 'class-validator';

export class UserCreateDTO extends PartialType(User) {
  @IsEmpty()
  id: number;
}
