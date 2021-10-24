import { IVideo } from '../model/video';
import { Queue } from './queue';

export class Publisher extends Queue {
  async publish(video: IVideo, queueName: string): Promise<void> {
    try {
      console.log(`Trying to sent message into queue ${queueName}.`);
      await this.channel().assertQueue(queueName);
      await this.channel().sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(video))
      );
      console.log(
        `Message ${JSON.stringify(
          video
        )} successfully sent into queue ${queueName}.`
      );
    } catch (ex) {
      console.error(ex);
    }
  }
}
