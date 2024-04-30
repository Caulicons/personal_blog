import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/posts.entity';
import { ILike, Repository } from 'typeorm';
import { ThemesService } from '../../themes/services/themes.service';
import { User } from '../../user/entities/user.entity';
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

  async create(post: Posts): Promise<Posts> {
    const themeExists = await this.themesService.findById(post.theme.id);
    if (!themeExists)
      throw new HttpException('Theme not found', HttpStatus.NOT_FOUND);

    return await this.postsRepository.save(post);
  }

  async update(id: number, post: Posts): Promise<Posts> {
    //Check if the post exist
    const postExist = await this.findOne(id);
    if (!postExist)
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);

    // Check if the theme passed exist
    if (post.theme?.id) {
      const themeExists = await this.themesService.findById(post.theme.id);
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
    return await this.postsRepository.save({ ...postExist, ...post });
  }

  async delete(
    id: number,
    user: User,
  ): Promise<{ statusCode: number; message: string }> {
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
    return await this.postsRepository.delete(id).then(() => {
      return {
        statusCode: 204,
        message: 'Post deleted successfully',
      };
    });
  }
}
