import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Length } from 'class-validator';

export class PostCreateDTO {
  @ApiProperty({
    type: String,
    required: true,
    example: 'My title',
    description: 'Title of the post',
    maxLength: 100,
    minLength: 3,
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @Length(3, 100)
  title: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'My content',
    description: 'Content of the post',
  })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    type: String,
    example:
      'https://t4.ftcdn.net/jpg/07/74/39/45/360_F_774394531_QY2821i8ctKVhsLvO9RxcBmHMsQylmcO.jpg',
  })
  photo: string;

  @ApiProperty({ type: Number, required: true })
  @IsNotEmpty()
  @IsNumber()
  theme: number;

  // The user id is passed through the AuthJwtGuard
  user: {
    id: number;
  };
}
