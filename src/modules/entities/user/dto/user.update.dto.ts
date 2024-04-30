import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { IsEmpty } from 'class-validator';

export class UpdateUserDto extends PartialType(User) {
  @IsEmpty()
  id: number;
}
