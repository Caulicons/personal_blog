import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Length, ValidateNested } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Theme } from '../../themes/entities/theme.entity';
import { User } from '../../user/entities/user.entity';

class themeDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
class userDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

@Entity('tb_posts')
export class Posts {
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @Column({ nullable: false })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @Length(3, 100)
  title: string;

  @Column({ length: 2000, nullable: false })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  content: string;

  @UpdateDateColumn()
  data: Date;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => themeDTO)
  @ManyToOne(() => Theme, (theme) => theme.posts, { onDelete: 'CASCADE' })
  theme: Theme;

  //@IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => userDTO)
  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User;
}
