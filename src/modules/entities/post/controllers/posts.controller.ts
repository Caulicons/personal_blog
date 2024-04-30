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
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { Posts } from '../entities/posts.entity';
import { AuthJtwGuard } from '../../../security/auth/guards/auth.jwt.guard';

@Controller('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(): Promise<Posts[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') // ParseIntPipe is used to transform the id string into number
    id: number,
  ): Promise<Posts> {
    const post = await this.postsService.findOne(id);
    if (!post) throw new HttpException('Post not found with id ' + id, 404);

    return post;
  }

  @Get('/title/:title')
  async findByTitle(@Param('title') title: string): Promise<Posts[]> {
    return await this.postsService.findByTitle(title);
  }

  @UseGuards(AuthJtwGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    post: Posts,
  ): Promise<Posts> {
    return await this.postsService.create(post);
  }

  @UseGuards(AuthJtwGuard)
  @Put(':id')
  async update(
    @Param('id')
    id: number,
    @Body()
    post: Posts,
  ): Promise<Posts> {
    return this.postsService.update(id, post);
  }

  @UseGuards(AuthJtwGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async delete(
    @Param('id') id: number,
    // The user id is passed through the AuthJwtGuard
    @Request()
    req,
  ): Promise<{ statusCode: number; message: string }> {
    return this.postsService.delete(id, req.user);
  }
}
