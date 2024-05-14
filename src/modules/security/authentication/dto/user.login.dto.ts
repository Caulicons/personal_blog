import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    example: 'root@root.com',
    description: 'User email, only valid email is allowed',
  })
  email: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Length(6, 18)
  @ApiProperty({ minLength: 6, maxLength: 18, example: 'rootroot' })
  password: string;
}
