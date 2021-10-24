import express from 'express';
import { Router } from 'express-serve-static-core';
import { IController } from './IController';
import { VideoProcessService } from '../services/videoProcessService';

export class VideoProcessingController implements IController {
  public router = express.Router();
  private videoProcessService: VideoProcessService;

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
    response.send('TODO');
  };

  getStatus = (request: express.Request, response: express.Response): void => {
    response.send('TODO');
  };

  processVideo = (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): void => {
    console.log('Try to upload video.');
    const fileData = response.locals.fileData;
    this.videoProcessService.processVideo(fileData);
    next();
  };
}
