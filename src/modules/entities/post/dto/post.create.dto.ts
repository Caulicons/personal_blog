import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class createPostDTO {
  @IsOptional()
  id: number;

  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @Length(3, 100)
  title: string;

  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @Length(3, 100)
  contente: string;
}
