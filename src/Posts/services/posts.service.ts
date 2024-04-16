import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from '../entities/posts.entity';
import { DeleteResult, ILike, Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private postsRepository: Repository<Posts>,
  ) {}

  async findAll(): Promise<Posts[]> {
    return this.postsRepository.find();
  }

  async findOne(id: number): Promise<Posts> {
    const post = await this.postsRepository.findOne({ where: { id } });

    if (!post) throw new HttpException('Post not found', 404);

    return post;
  }

  async findByTitle(title: string): Promise<Posts[]> {
    const posts = await this.postsRepository.find({
      where: {
        title: ILike(`%${title}%`),
      },
    });

    if (!posts.length)
      throw new HttpException('Posts not found with that title', 404);

    return posts;
  }

  async create(post: Posts): Promise<Posts> {
    return await this.postsRepository.save(post);
  }

  async update(id: number, post: Posts): Promise<Posts> {
    const postExist = await this.findOne(id);

    if (!postExist) throw new HttpException('Post not found', 404);

    return await this.postsRepository.save({ ...postExist, ...post });
  }

  async delete(id: number): Promise<DeleteResult> {
    const postExist = await this.findOne(id);

    if (!postExist) throw new HttpException('Post not found', 404);

    return await this.postsRepository.delete(id);
  }
}
