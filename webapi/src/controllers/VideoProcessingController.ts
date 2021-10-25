import express from 'express';
import { Router } from 'express-serve-static-core';
import IController from './IController';
import VideoProcessService from '../services/VideoProcessService';

class VideoProcessingController implements IController {
  public router = express.Router();
  private videoProcessService: VideoProcessService;

  constructor(videoProcessService: VideoProcessService) {
    this.videoProcessService = videoProcessService;
  }

  initializeRoutes(router: Router): void {
    router.post('/start', this.processVideo);
  }

  processVideo = (request: express.Request, response: express.Response): void => {
    console.log('Try to upload video.');
    const fileData = response.locals.fileData;
    this.videoProcessService.processVideo(fileData);
    response.send(`File ${request.file?.originalname} uploaded.`);
  };
}

export default VideoProcessingController;
