import { IVideo } from '../model/video';
import { Queue } from './queue';
import { Request, Response, NextFunction } from 'express';

export class Publisher extends Queue {
  async publish(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log('Trying to sent into queue.');
      const video: IVideo = { title: 'Pulp Fiction', status: 'Uploaded' };
      await this.channels[0].sendToQueue(
        'jobs',
        Buffer.from(JSON.stringify(video))
      );
      console.log(`Job sent successfully ${JSON.stringify(video)}`);
      next();
    } catch (ex) {
      console.error(ex);
    }
  }
}
