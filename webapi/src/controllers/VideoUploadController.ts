import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { IController } from './IController';
import { Router } from 'express-serve-static-core';
import FileUploadService from '../services/FileUploadService';

export class VideoUploadController implements IController {
  private upload = multer();

  initializeRoutes(router: Router): void {
    router.post(
      '/start',
      this.upload.single('file'),
      this.uploadFile.bind(this)
    );
    router.use(cors());
  }

  async uploadFile(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const file = request.file;
      const fileUploadService = new FileUploadService(file);
      const result = await fileUploadService.createFileUpload();

      result
        ? response.status(201)
        : response
            .status(500)
            .send(`Failed to upload a file ${request.file?.originalname}.`);

      response.locals.fileData = result;
      next();
    } catch (error) {
      console.error(error);
      response.status(400).send('Failed to upload vide.');
    }
  }
}
