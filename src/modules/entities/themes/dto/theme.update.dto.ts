import { PartialType } from '@nestjs/mapped-types';
import { Theme } from '../entities/theme.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ThemeUpdateDTO extends PartialType(Theme) {
  @ApiProperty({ uniqueItems: true, maxLength: 255 })
  name: string;
}
