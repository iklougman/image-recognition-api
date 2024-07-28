import { Module } from '@nestjs/common';
import { NsfwController } from './nfsw/nsfw.controller';
import { NsfwService } from './nfsw/nsfw.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({})],
  controllers: [NsfwController],
  providers: [NsfwService],
})
export class AppModule {}
