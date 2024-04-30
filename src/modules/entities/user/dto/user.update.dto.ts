import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserDto extends PartialType(User) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
