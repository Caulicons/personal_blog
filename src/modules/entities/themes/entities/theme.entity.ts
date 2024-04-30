import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Posts } from '../../post/entities/posts.entity';

@Entity('tb_themes')
export class Theme {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @IsNotEmpty()
  @Column({ unique: true, length: 255, nullable: false })
  name: string;

  @OneToMany(() => Posts, (posts) => posts.theme)
  posts: Posts[];
}
