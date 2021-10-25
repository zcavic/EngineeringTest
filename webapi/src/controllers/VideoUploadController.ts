import express from 'express';
import { Multer } from 'multer';
import cors from 'cors';
import fs from 'fs';
import IController from './IController';
import { Router } from 'express-serve-static-core';
import VideoUploadService from '../services/VideoUploadService';

class VideoUploadController implements IController {
  private fileUploadService: VideoUploadService;
  private multer: Multer;

  constructor(fileUploadService: VideoUploadService, multer: Multer) {
    this.fileUploadService = fileUploadService;
    this.multer = multer;
  }

  initializeRoutes(router: Router): void {
    router.post('/start', this.multer.single('file'), this.uploadFile.bind(this));
    router.use(cors());
  }

  async uploadFile(request: express.Request, response: express.Response, next: express.NextFunction): Promise<void> {
    try {
      const file = request.file;

      if (!file) {
        response.status(500).send('Missing file in request.');
        return;
      }
      const result = await this.fileUploadService.saveFileDataInDb(file);
      if (!result) {
        response.status(500).send('Unable to save video data into database.');
        return;
      }

      response.locals.fileData = result;
      next();

    } catch (error) {
      console.error(error);
      response.status(400).send('Failed to upload vide.');
    }
  }
}

export default VideoUploadController;
