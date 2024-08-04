import { Controller,  Get, Post, Body, Patch, Param,BadRequestException, Delete,UsePipes, ValidationPipe, ParseIntPipe, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { commentPostDto } from './dto/comment.dto';
import { LikePostDto } from './dto/like.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const title = req.body.title;
        const fileExt = file.originalname.split('.').pop();
        const newFileName = `${title.split(' ').join('_')}_${Date.now()}.${fileExt}`;
        cb(null, newFileName);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new BadRequestException('Only image files are allowed!'), false);
      }
      cb(null, true);
    },
  }))
  @UsePipes(new ValidationPipe())
  async create(@Body() createPostDto: CreatePostDto, @UploadedFile() image: Express.Multer.File) {
    if (image) {
      createPostDto.image = image.filename;
    }
    return await this.postService.create(createPostDto);
  }
  @Post('like')
   @UsePipes(new ValidationPipe())
   likePost(@Body() like:LikePostDto){
    return this.postService.likePost(like)
   }
   @Post('comment')
   @UsePipes(new ValidationPipe())
   commentPost(@Body() comment: commentPostDto){
    return this.postService.commentPost(comment)
   }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.postService.remove(id);
  }
}
