import express from 'express';
import { Router } from 'express-serve-static-core';
import { IController } from './IController';
import { VideoProcessService } from '../services/videoProcessService';
import { IFileRepo } from '../repository/FileRepo';

export class VideoProcessingController implements IController {
  public router = express.Router();
  private videoProcessService: VideoProcessService;
  private fileRepo: IFileRepo;

  constructor(videoProcessService: VideoProcessService, fileRepo: IFileRepo) {
    this.videoProcessService = videoProcessService;
    this.fileRepo = fileRepo;
  }

  initializeRoutes(router: Router): void {
    router.get('/files', this.getAllVideos);
    router.get('/files/:fileId/status', this.getStatus);
    router.get('/files/:fileId/delete', this.deleteVideo);
    router.post('/start', this.processVideo);
  }

  getAllVideos = async (request: express.Request, response: express.Response): Promise<void> => {
    const allFiles = await this.fileRepo.getAllFileData();
    const res = {
      success: true,
      message: 'All videos successfully fetched.',
      uploadedFiles: allFiles,
    };
    response.send(res);
  };

  getStatus = async (request: express.Request, response: express.Response): Promise<void> => {
    const id = request?.params?.fileId;
    const fileData = await this.fileRepo.getFileData(id);
    if (fileData) {
      const res = {
        success: true,
        message: 'The video successfully fetched.',
        status: fileData.processingStatus,
      };
      response.send(res);
    } else {
      const res = {
        success: false,
        message: 'Invalid file id.',
      };
      response.send(res);
    }
  };

  deleteVideo = async (request: express.Request, response: express.Response): Promise<void> => {
    const id = request?.params?.fileId;
    const fileData = await this.fileRepo.deleteFile(id);
    if (fileData) {
      const res = {
        success: true,
        message: 'The video successfully deleted.',
      };
      response.send(res);
    } else {
      const res = {
        success: false,
        message: 'Invalid file id.',
      };
      response.send(res);
    }
  };

  processVideo = (request: express.Request, response: express.Response, next: express.NextFunction): void => {
    console.log('Try to upload video.');
    const fileData = response.locals.fileData;
    this.videoProcessService.processVideo(fileData);
    next();
  };
}
