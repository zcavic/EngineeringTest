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

  public initializeRoutes() {
    this.router.get('/files', this.getAllVideos);
    this.router.get('/files/:fileId/status', this.getStatus);
    this.router.post('/start', this.uploadVideo);
  }

  getAllVideos = (request: express.Request, response: express.Response) => {
    response.send(this.video);
  };

  getStatus = (request: express.Request, response: express.Response) => {
    response.send(this.video);
  };

  uploadVideo = (request: express.Request, response: express.Response) => {
    const video: IVideo = request.body;
    this.video.push(video);
    response.send(video);
  };
}

export default VideoController;
