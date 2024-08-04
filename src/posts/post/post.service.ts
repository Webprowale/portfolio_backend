import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/Prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { LikePostDto } from './dto/like.dto';

@Injectable()
export class PostService {
  constructor(private prisma:PrismaService){}
 async create(createPostDto:Prisma.PostsCreateInput) {
    const creatpost = await this.prisma.posts.create({
      data: createPostDto
    });
    return{
      message: "Post created succcessfully!",
      data:creatpost
    }
  }

  findAll() {
    return this.prisma.posts.findMany();
  }

  async findOne(id:number) {
    const post = await this.prisma.posts.findUnique({
      where: { id }, include:{
        comment: true,
        like: true
      }
    });
    if(!post) throw new HttpException('Post does not exist', HttpStatus.BAD_REQUEST)
      return post;
  }
  async likePost(like: LikePostDto) {
    const post = await this.findOne(like.postId);
    if (!post) throw new HttpException('Post does not exist', HttpStatus.BAD_REQUEST);
  
    const existingLike = await this.prisma.like.findUnique({
      where: {
        postId: like.postId,
      },
    });
  
    if (like.count) {
      if (!existingLike) {
        await this.prisma.like.create({
          data: {
            postId: like.postId,
            count: 1, 
          },
        });
      } else {
        await this.prisma.like.update({
          where: {
            postId: like.postId,
          },
          data: {
            count: {
              increment: 1,
            },
          },
        });
      }
  
      return {
        message: "Like added successfully",
        postId: like.postId,
      };
    } else {
      if (existingLike && existingLike.count > 0) {
        await this.prisma.like.update({
          where: {
            postId: like.postId,
          },
          data: {
            count: {
              decrement: 1,
            },
          },
        });
  
        return {
          message: "Like removed successfully",
          postId: like.postId,
        };
      } else {
        throw new HttpException('Cannot decrement like count below zero', HttpStatus.BAD_REQUEST);
      }
    }
  }
  
  async commentPost(comment:Prisma.CommentCreateManyInput){
    const postId = await this.findOne(comment.postId);
    if(!postId) throw new HttpException('Post does not exist', HttpStatus.BAD_REQUEST)
    await this.prisma.comment.create({
      data: comment
    })
    return {
      message: "Comment added successfully",
      postId: comment.postId
    }
  }
  async update(id: number, updatePostDto: Prisma.PostsUpdateInput) {
    const post = await this.findOne(id)
    if(!post) throw new HttpException('Post does not exist', HttpStatus.BAD_REQUEST)
      
    await this.prisma.posts.update({
      where: { id },
      data: updatePostDto
    })
    return {
      message: "Post updated successfully",
      postId: id
    }
  }

  async remove(id:number) {
    const post = await this.findOne(id)
    if(!post) throw new HttpException('Post does not exist', HttpStatus.BAD_REQUEST)
      
    const removePost = await this.prisma.posts.delete({
      where: { id }
    })
    return {
      message: "Post deleted successfully",
      data:removePost
    }
  }
}
