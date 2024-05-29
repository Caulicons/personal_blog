import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/posts.entity';
import { ILike, Repository } from 'typeorm';
import { ThemesService } from '../../themes/services/themes.service';
import { User } from '../../user/entities/user.entity';
import { PostCreateDTO } from '../dto/post.create.dto';
import { PostUpdateDTO } from '../dto/post.update.dto';
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
        user: true,
      },
    });
  }

  async findOne(id: number): Promise<Posts> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: {
        theme: true,
        user: true,
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
        user: true,
      },
    });

    if (!posts.length)
      throw new HttpException(
        'Posts not found with that title',
        HttpStatus.NOT_FOUND,
      );

    return posts;
  }

  async create(post: PostCreateDTO): Promise<Posts> {
    const themeExists = await this.themesService.findById(post.theme);
    if (!themeExists)
      throw new HttpException('Theme not found', HttpStatus.NOT_FOUND);

    return await this.postsRepository.save({
      ...post,
      theme: { id: post.theme },
      // The user id is passed through the AuthJwtGuard
      user: { id: post.user.id },
    });
  }

  async update(id: number, post: PostUpdateDTO): Promise<Posts> {
    //Check if the post exist
    const postExist = await this.findOne(id);
    if (!postExist)
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    // Check if the theme passed exist
    if (post.theme) {
      const themeExists = await this.themesService.findById(post.theme);
      if (!themeExists)
        throw new HttpException('Theme not found', HttpStatus.NOT_FOUND);
    }

    // Verify if the user post is equal
    if (postExist.user.id !== post.user.id)
      throw new HttpException(
        'You are not allowed to edit this post because you is not the owner.',
        HttpStatus.FORBIDDEN,
      );

    // update post
    return await this.postsRepository.save({
      ...postExist,
      ...post,
      theme: { id: post.theme || postExist.theme.id },
      // The user id is passed through the AuthJwtGuard
    });
  }

  async delete(id: number, user: User) {
    // Verify if the post exists
    const postExist = await this.findOne(id);
    if (!postExist)
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    // Verify if the user post is equal
    if (user.id !== postExist.user.id)
      throw new HttpException(
        'You are not allowed to edit this post because you is not the owner.',
        HttpStatus.FORBIDDEN,
      );

    // delete post
    return await this.postsRepository.delete(id);
  }
}
