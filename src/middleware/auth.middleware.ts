import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === process.env.API_KEY) {
      next();
    } else {
      throw new UnauthorizedException('Invalid API key');
    }
  }
}
