import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { Posts } from '../entities/posts.entity';
import { DeleteResult } from 'typeorm';

@Controller('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<Posts[]> {
    return this.postsService.findAll();
  }

  @Get('/:id')
  async findOne(
    @Param('id') // ParseIntPipe is used to transform the id string into number
    id: number,
  ): Promise<Posts> {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new HttpException('Post not found with id ' + id, 404);
    }
    return post;
  }

  @Get('/title/:title')
  async findByTitle(@Param('title') title: string): Promise<Posts[]> {
    return await this.postsService.findByTitle(title);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPost(
    @Body()
    post: Posts,
  ): Promise<Posts> {
    return await this.postsService.create(post);
  }

  @Put(':id')
  async updatePost(
    @Body()
    post: Posts,
    @Param('id')
    id: number,
  ): Promise<Posts> {
    return this.postsService.update(id, post);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number): Promise<DeleteResult> {
    return this.postsService.delete(id);
  }
}
