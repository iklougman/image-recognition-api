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
    const image: tf.Tensor3D | tf.Tensor4D = tf.node.decodeImage(imageBuffer);
    const predictions: nsfw.predictionType[] = await this.model.classify(
      image as tf.Tensor3D,
    );
    return predictions;
  }
}
