import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Column } from 'typeorm';

export class ThemeCreateDTO {
  @IsNotEmpty()
  @Column({ unique: true, length: 255, nullable: false })
  @ApiProperty()
  name: string;
}
