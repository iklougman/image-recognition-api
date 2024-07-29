import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { NsfwController } from './nfsw/nsfw.controller';
import { NsfwService } from './nfsw/nsfw.service';
import { MulterModule } from '@nestjs/platform-express';
import { AuthMiddleware } from './middleware/auth.middleware';
import { RateLimitingMiddleware } from './middleware/rate-limiting.middleware';

@Module({
  imports: [MulterModule.register({})],
  controllers: [NsfwController],
  providers: [NsfwService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, RateLimitingMiddleware)
      .forRoutes({ path: 'nsfw/analyze', method: RequestMethod.POST });
  }
}
