import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Length(6, 18)
  password: string;
}
