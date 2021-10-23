import express from 'express';
import { IVideo } from '../model/video';
import { Controller } from './controller.interface';

class VideoController implements Controller {
  public router = express.Router();

  private video: IVideo[] = [
    {
      title: 'Pulp Fiction',
      status: 'Uploaded',
    },
  ];

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get('/files', this.getAllVideos);
    this.router.get('/files/:fileId/status', this.getStatus);
    this.router.post('/start', this.uploadVideo);
  }

  getAllVideos = (
    request: express.Request,
    response: express.Response
  ): void => {
    response.send(this.video);
  };

  getStatus = (request: express.Request, response: express.Response): void => {
    response.send(this.video);
  };

  uploadVideo = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    console.log('Try to upload video.');
    const video: IVideo = { title: 'Pulp Fiction', status: 'Uploaded' };
    this.video.push(video);
    console.log('Video is uploaded. Try to update response.');
    response.send(video);
    console.log('Response updated. Try to call next middleware.');
    next();
  };
}

export default VideoController;
