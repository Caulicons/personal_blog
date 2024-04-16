import { IsNotEmpty, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_posts')
export class Posts {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @IsNotEmpty()
  @Length(3, 100)
  @Column({ nullable: false })
  title: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  content: string;
}
