
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class LikePostDto {
@IsNotEmpty()
  @IsBoolean()
  count: boolean;

  @IsNotEmpty()
  @IsNumber()
  postId: number;
}