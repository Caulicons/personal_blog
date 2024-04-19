import { IsNotEmpty, Length } from 'class-validator';
import { Theme } from 'src/themes/entities/theme.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tb_posts')
export class Posts {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  // @Transform({value: } => value.toLowerCase())
  @IsNotEmpty()
  @Length(3, 100)
  @Column({ nullable: false })
  title: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  content: string;

  @UpdateDateColumn()
  data: Date;

  @ManyToOne(() => Theme, (theme) => theme.posts, { onDelete: 'CASCADE' })
  theme: Theme;
}
