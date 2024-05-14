import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNotIn,
  IsOptional,
  IsUrl,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';

export class UserCreateDTO {
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Transform(({ value }: TransformFnParams) => value?.toLowerCase())
  @IsNotIn(['admin', 'user', 'guest'], {
    message: "he name admin, user or guest can't be used",
  })
  @IsNotEmpty()
  @Length(3, 24)
  @ApiProperty({
    example: 'root',
    maxLength: 24,
    minLength: 3,
    required: true,
  })
  username: string;

  @Transform(({ value }: TransformFnParams) => value?.toLowerCase())
  @IsEmail()
  @MaxLength(320)
  @ApiProperty({
    example: 'root@root.com',
    maxLength: 320,
    required: true,
  })
  email: string;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Length(6, 18)
  @ApiProperty({
    example: 'rootroot',
    minLength: 6,
    maxLength: 18,
    required: true,
  })
  password: string;

  @IsOptional()
  @IsIn(['admin', 'standard'])
  @ApiProperty({
    examples: ['standard', 'admin'],
    default: 'standard',
    required: false,
  })
  type: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty({
    required: false,
    description: 'User photo, must be a valid url',
    default:
      'https://media.istockphoto.com/id/464988959/pt/foto/pato-real-com-tra%C3%A7ado-de-recorte.jpg?s=612x612&w=0&k=20&c=SUhSeo67zEVs8bgUm0K-OrMDD4iQ5s75CxaOG4gBI1Y=',
  })
  photo: string;
}
