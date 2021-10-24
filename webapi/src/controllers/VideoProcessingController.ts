import express from 'express';
import { Router } from 'express-serve-static-core';
import { IVideo } from '../model/video';
import { IController } from './IController';
import { VideoProcessService } from '../services/videoProcessService';

export class VideoProcessingController implements IController {
  public router = express.Router();
  private videoProcessService: VideoProcessService;

  private video: IVideo[] = [
    {
      title: 'Pulp Fiction',
      status: 'Uploaded',
    },
  ];

  constructor(videoProcessService: VideoProcessService) {
    this.videoProcessService = videoProcessService;
  }

  initializeRoutes(router: Router): void {
    router.get('/files', this.getAllVideos);
    router.get('/files/:fileId/status', this.getStatus);
    router.post('/start', this.processVideo);
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

  processVideo = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): void => {
    console.log('Try to upload video.');
    const video: IVideo = { title: 'Pulp Fiction', status: 'Uploaded' };
    this.videoProcessService.processVideo(video);
    next();
  };
}
