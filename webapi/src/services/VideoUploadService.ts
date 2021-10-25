import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { FileData, UploadedFileData } from '../model/FileData';
import IFileRepo from '../repository/IFileRepo';
import { isFileSizeValid, isFileTypeValid } from './validators/fileValidator';

class VideoUploadService {
  private fileRepo: IFileRepo;

  constructor(fileRepo: IFileRepo) {
    this.fileRepo = fileRepo;
  }

  async saveFileDataInDb(file: Express.Multer.File): Promise<UploadedFileData> {
    if (!isFileSizeValid(file.size)) throw new Error('Invalid file size.');
    if (!isFileTypeValid(this.getFileExtension(file.originalname))) throw new Error('Invalid file type.');

    const uniqueFileName = this.createUniqueFileName(file.originalname);

    const newFile: FileData = {
      originalName: file.originalname,
      uniqueFileName,
      fileSize: file.size,
      fileExtension: this.getFileExtension(file.originalname),
      processingStatus: 'Uploaded',
    };

    const id = await this.fileRepo.saveFileData(newFile);

    if (!id) throw new Error('Failed to upload database.');

    const uploadedFile: UploadedFileData = {
      id: id,
      originalName: newFile.originalName,
      uniqueFileName: newFile.uniqueFileName,
      fileSize: newFile.fileSize,
      fileExtension: newFile.fileExtension,
      processingStatus: newFile.processingStatus,
    };

    return uploadedFile;
  }

  private getFileExtension(fileName: string): string {
    return path.extname(fileName);
  }

  private createUniqueFileName(fileName: string): string {
    const timeStamp = new Date().toISOString().replace(/[-:.TZ]/g, '');
    return `${uuidv4()}_${timeStamp}${this.getFileExtension(fileName)}`;
  }
}

export default VideoUploadService;
