import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { Posts } from '../entities/posts.entity';
import { AuthJtwGuard } from '../../../security/authentication/guards/auth.jwt.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostCreateDTO } from '../dto/post.create.dto';
import { PostUpdateDTO } from '../dto/post.update.dto';

@ApiTags('Post')
@Controller('/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiResponse({
    type: Posts,
    isArray: true,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Posts[]> {
    return this.postsService.findAll();
  }

  @ApiResponse({
    type: Posts,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(
    @Param('id', ParseIntPipe) // ParseIntPipe is used to transform the id string into number
    id: number,
  ): Promise<Posts> {
    const post = await this.postsService.findOne(id);
    if (!post) throw new HttpException('Post not found with id ' + id, 404);

    return post;
  }

  @ApiResponse({
    type: Posts,
    isArray: true,
  })
  // Return only one post or a list of posts
  @Get('/title/:title')
  async findByTitle(@Param('title') title: string): Promise<Posts[]> {
    return await this.postsService.findByTitle(title);
  }

  @ApiBearerAuth()
  @UseGuards(AuthJtwGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body()
    post: PostCreateDTO,
  ): Promise<Posts> {
    return await this.postsService.create(post);
  }

  @ApiBearerAuth()
  @UseGuards(AuthJtwGuard)
  @Put(':id')
  async update(
    @Param('id')
    id: number,
    @Body()
    post: PostUpdateDTO,
  ): Promise<Posts> {
    return this.postsService.update(id, post);
  }

  @ApiBearerAuth()
  @UseGuards(AuthJtwGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id') id: number,
    // The user id is passed through the AuthJwtGuard
    @Request()
    req,
  ) {
    return this.postsService.delete(id, req.user);
  }
}
