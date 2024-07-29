import { IsNotEmpty, IsMimeType } from 'class-validator';
import { Type } from 'class-transformer';

export class ImageUploadDto {
  @IsNotEmpty()
  @Type(() => Buffer)
  @IsMimeType()
  image: Express.Multer.File;
}
