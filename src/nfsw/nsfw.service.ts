import { Injectable, OnModuleInit } from '@nestjs/common';
import * as nsfw from 'nsfwjs';
import * as tf from '@tensorflow/tfjs-node';

@Injectable()
export class NsfwService implements OnModuleInit {
  private model: nsfw.NSFWJS;

  async onModuleInit() {
    this.model = await nsfw.load();
  }

  async classifyImage(imageBuffer: Buffer) {
    const image: any = tf.node.decodeImage(imageBuffer);
    const predictions = await this.model.classify(image);
    return predictions;
  }
}
