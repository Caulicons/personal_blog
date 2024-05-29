import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  ValidateNested,
} from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Theme } from '../../themes/entities/theme.entity';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  readonly id: number;

  @ApiProperty()
  @Column({ nullable: false })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @Length(3, 100)
  title: string;

  @ApiProperty()
  @Column({ nullable: false })
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @UpdateDateColumn()
  data: Date;

  @ApiProperty()
  @Column({ nullable: true })
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  photo: string;

  @ApiProperty({ type: () => themeDTO })
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => themeDTO)
  @ManyToOne(() => Theme, (theme) => theme.posts, { onDelete: 'CASCADE' })
  theme: Theme;

  @IsNotEmpty()
  @ApiProperty({ type: () => userDTO })
  @ValidateNested({ each: true })
  @Type(() => userDTO)
  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user: User;
}
