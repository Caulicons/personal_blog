import { IsNotEmpty } from 'class-validator';
import { Posts } from 'src/post/entities/posts.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
