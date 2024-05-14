import { HttpException, Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { Theme } from '../entities/theme.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeCreateDTO } from '../dto/theme.create.dto';
import { ThemeUpdateDTO } from '../dto/theme.update.dto';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme)
    private readonly themesRepository: Repository<Theme>,
  ) {}

  async create(theme: ThemeCreateDTO) {
    const themeExist = await this.themesRepository.findOne({
      where: {
        name: theme.name,
      },
    });

    if (themeExist) throw new HttpException('Theme already exists', 409);
    return this.themesRepository.save(theme);
  }
  async findAll() {
    return this.themesRepository.find({
      relations: {
        posts: true,
      },
    });
  }

  async findById(id: number): Promise<Theme> {
    const theme = await this.themesRepository.findOne({
      where: {
        id,
      },
      relations: {
        posts: true,
      },
    });

    if (!theme) throw new HttpException(`Theme with id ${id} not found`, 404);

    return theme;
  }

  async findByName(name: string): Promise<Theme[]> {
    const theme = await this.themesRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
      relations: {
        posts: true,
      },
    });

    if (!theme.length)
      throw new HttpException(`Theme with name ${name} not found`, 404);

    return theme;
  }

  async update(id: number, theme: ThemeUpdateDTO): Promise<Theme> {
    const themeExist = await this.findById(id);

    if (!themeExist) throw new HttpException('Theme not found', 404);
    console.log(theme);
    return this.themesRepository.save({ ...themeExist, ...theme });
  }

  async delete(id: number) {
    const themeExist = await this.findById(id);

    // Verify if the post exists
    if (!themeExist) throw new HttpException('Theme not found', 404);

    // delete post
    return await this.themesRepository.remove(themeExist);
  }
}
