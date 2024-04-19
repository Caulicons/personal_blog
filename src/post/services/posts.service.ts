import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/posts.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { ThemesService } from 'src/themes/services/themes.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
    private themesService: ThemesService,
  ) {}

  async findAll(): Promise<Posts[]> {
    return this.postsRepository.find({
      relations: {
        theme: true,
      },
    });
  }

  async findOne(id: number): Promise<Posts> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: {
        theme: true,
      },
    });

    if (!post) throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    return post;
  }

  async findByTitle(title: string): Promise<Posts[]> {
    const posts = await this.postsRepository.find({
      where: {
        title: ILike(`%${title}%`),
      },
      relations: {
        theme: true,
      },
    });

    if (!posts.length)
      throw new HttpException(
        'Posts not found with that title',
        HttpStatus.NOT_FOUND,
      );

    return posts;
  }

  async create(post: Posts): Promise<Posts> {
    if (post.theme) {
      const themeExists = await this.themesService.findById(post.theme.id);
      if (!themeExists)
        throw new HttpException('Theme not found', HttpStatus.NOT_FOUND);
    }

    return await this.postsRepository.save(post);
  }

  async update(id: number, post: Posts): Promise<Posts> {
    const postExist = await this.findOne(id);
    if (!postExist)
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    const themeExists = await this.themesService.findById(post.theme.id);
    if (!themeExists)
      throw new HttpException('Theme not found', HttpStatus.NOT_FOUND);

    return await this.postsRepository.save({ ...postExist, ...post });
  }

  async delete(id: number): Promise<DeleteResult> {
    const postExist = await this.findOne(id);

    if (!postExist)
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    return await this.postsRepository.delete(id);
  }
}
