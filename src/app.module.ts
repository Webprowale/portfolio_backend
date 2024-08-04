import { Module } from '@nestjs/common';
import { PostModule } from './posts/post/post.module';
import { AdminModule } from './admin/admin.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [PostModule, AdminModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
