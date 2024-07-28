import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NsfwService } from './nsfw.service';

@Controller('nsfw')
export class NsfwController {
  constructor(private readonly nsfwService: NsfwService) {}

  @Post('analyze')
  @UseInterceptors(FileInterceptor('image'))
  async analyze(@UploadedFile() file: any) {
    const predictions = await this.nsfwService.classifyImage(file.buffer);
    return predictions;
  }
}
