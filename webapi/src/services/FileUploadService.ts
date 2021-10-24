import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { IFileRepo } from '../repository/FileStatusRepo';
import { FileData } from '../model/video';

class FileUploadService {
  private file: Express.Multer.File;
  private fileRepo: IFileRepo;

  constructor(fileRepo: IFileRepo, file: Express.Multer.File) {
    this.fileRepo = fileRepo;
    this.file = file;
  }

  async createFileUpload(processingStatus: string): Promise<void> {
    const uniqueFileName = this.createUniqueFileName();
    await this.createFileRecord(processingStatus, uniqueFileName);

    this.writeToFileStream(uniqueFileName);
  }

  private getFileExtension(): string {
    return path.extname(this.file.originalname);
  }

  private createUniqueFileName(): string {
    const timeStamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
    return `${uuidv4()}_${timeStamp}${this.getFileExtension()}`;
  }

  private async createFileRecord(
    processingStatus: string,
    uniqueFileName: string
  ): Promise<void> {
    const fileData: FileData = {
      fileName: this.file.originalname,
      uniqueFileName,
      fileSize: this.file.size,
      fileExtension: this.getFileExtension(),
      processingStatus,
    };
    await this.fileRepo.saveFileData(fileData);
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
