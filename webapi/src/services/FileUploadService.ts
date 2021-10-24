import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { FileData, UploadedFileData } from '../model/video';
import { collections } from '../repository/FileDatabase';

class FileUploadService {
  private file: Express.Multer.File;

  constructor(file?: Express.Multer.File) {
    if (!file) throw new Error('File is undefined.');
    this.file = file;
  }

  async createFileUpload(): Promise<FileData> {
    const uniqueFileName = this.createUniqueFileName();
    this.writeToFileStream(uniqueFileName);

    const newFile: FileData = {
      originalName: this.file.originalname,
      uniqueFileName,
      fileSize: this.file.size,
      fileExtension: this.getFileExtension(),
      processingStatus: 'Uploaded',
    };

    const result = await collections.fileData?.insertOne(newFile);

    if (!result) throw new Error('Failed to upload database.');

    const uploadedFile: UploadedFileData = {
      id: result.insertedId.toString(),
      originalName: newFile.originalName,
      uniqueFileName: newFile.uniqueFileName,
      fileSize: newFile.fileSize,
      fileExtension: newFile.fileExtension,
      processingStatus: newFile.processingStatus,
    };

    return uploadedFile;
  }

  private getFileExtension(): string {
    return path.extname(this.file.originalname);
  }

  private createUniqueFileName(): string {
    const timeStamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
    return `${uuidv4()}_${timeStamp}${this.getFileExtension()}`;
  }

  private writeToFileStream(uniqueFileName: string) {
    const fileStream = fs.createWriteStream(
      `${__dirname}/../img/${uniqueFileName}`
    );

    fileStream.write(this.file.buffer, 'base64');

    fileStream.on('error', () => {
      console.log('error occurred while writing to stream');
    });

    fileStream.end();
  }
}

export default FileUploadService;
