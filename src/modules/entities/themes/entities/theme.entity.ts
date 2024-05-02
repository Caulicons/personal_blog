import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Posts } from '../../post/entities/posts.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tb_themes')
export class Theme {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ unique: true, length: 255, nullable: false })
  @ApiProperty()
  name: string;

  @ApiProperty()
  @OneToMany(() => Posts, (posts) => posts.theme)
  posts: Posts[];
}
