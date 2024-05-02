import { Transform, TransformFnParams } from 'class-transformer';
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
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Posts } from '../../post/entities/posts.entity';

@Entity({ name: 'tb_users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @Transform(({ value }: TransformFnParams) => value?.toLowerCase())
  @IsNotIn(['admin', 'user', 'guest'], {
    message: "he name admin, user or guest can't be used",
  })
  @IsNotEmpty()
  @Length(3, 24)
  username: string;

  @Column({ unique: true })
  @Transform(({ value }: TransformFnParams) => value?.toLowerCase())
  @IsEmail()
  @MaxLength(320)
  email: string;

  @Column({})
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty()
  @Length(6, 18)
  password: string;

  @Column({ default: 'standard' })
  @IsOptional()
  @IsIn(['admin', 'standard'])
  type: string;

  @Column({
    default:
      'https://media.istockphoto.com/id/464988959/pt/foto/pato-real-com-tra%C3%A7ado-de-recorte.jpg?s=612x612&w=0&k=20&c=SUhSeo67zEVs8bgUm0K-OrMDD4iQ5s75CxaOG4gBI1Y=',
  })
  @IsOptional()
  @IsUrl()
  photo: string;

  @OneToMany(() => Posts, (postagens) => postagens.user)
  posts: Posts[];
}
