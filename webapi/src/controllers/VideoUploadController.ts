import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { IController } from './IController';
import { Router } from 'express-serve-static-core';
import path from 'path';
import {
  FileSizeValidator,
  FileTypeValidator,
} from '../validators/fileValidator';

import FileUploadService from '../services/FileUploadService';
import { FileRepo } from '../repository/FileStatusRepo';

export class VideoUploadController implements IController {
  private fileSizeValidator: FileSizeValidator;
  private fileTypeValidator: FileTypeValidator;
  private upload = multer();

  constructor(
    fileSizeValidator: FileSizeValidator,
    fileTypeValidator: FileTypeValidator
  ) {
    this.fileSizeValidator = fileSizeValidator;
    this.fileTypeValidator = fileTypeValidator;
  }

  initializeRoutes(router: Router): void {
    router.post(
      '/start',
      this.upload.single('file'),
      this.uploadFile.bind(this)
    );

    // initialize middleware
    router.use(cors());
  }

  async uploadFile(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    try {
      const file: any = request.file;

      if (
        !this.fileTypeValidator.validateFileType(
          path.extname(file.originalname)
        ) ||
        !this.fileSizeValidator.validateFileSize(file.size)
      ) {
        response.status(400).json({
          success: false,
          message: 'Invalid Request',
        });
      }

      const fileUploadService = new FileUploadService(
        new FileRepo('mongodb://localhost:27017/test'),
        file
      );
      await fileUploadService.createFileUpload('Uploaded');

      /*
      if (fileId === 0) {
        return response.status(500).json({
          success: false,
          message: 'Error uploading file',
        });
        */

      response.json({
        success: true,
        fileId: 1,
      });
      next();
    } catch (error) {
      response.json({
        success: false,
        message: 'Error uploading file',
      });
    }
  }
}
