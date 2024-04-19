import { HttpException, Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { Theme } from '../entities/theme.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/post/entities/posts.entity';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme)
    private readonly themesRepository: Repository<Theme>,
  ) {}

  async create(theme: Theme) {
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
    const posts = await this.themesRepository.find({
      where: {
        name: ILike(`%${name}%`),
      },
      relations: {
        posts: true,
      },
    });

    if (!posts.length)
      throw new HttpException(`Theme with name ${name} not found`, 404);

    return posts;
  }

  async update(id: number, theme: Theme): Promise<Theme> {
    const themeExist = await this.findById(id);

    if (!themeExist) throw new HttpException('Theme not found', 404);

    return this.themesRepository.save({ ...themeExist, ...theme });
  }

  async delete(id: number): Promise<Theme> {
    const themeExist = await this.findById(id);

    if (!themeExist) throw new HttpException('Theme not found', 404);

    return this.themesRepository.remove(themeExist);
  }
}
