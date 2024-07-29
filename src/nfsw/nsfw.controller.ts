import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NsfwService } from './nsfw.service';
import { ImageUploadDto } from '@dto/image.dto';
import { predictionType } from 'nsfwjs';

@Controller('nsfw')
export class NsfwController {
  constructor(private readonly nsfwService: NsfwService) {}

  @Post('analyze')
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async analyze(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<predictionType[]> {
    const fileUploadDto = new ImageUploadDto();
    fileUploadDto.image = file;
    const predictions: predictionType[] = await this.nsfwService.classifyImage(
      file.buffer,
    );
    return predictions;
  }
}
