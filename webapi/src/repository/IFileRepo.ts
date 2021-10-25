import { FileData, UploadedFileData } from '../model/FileData';

interface IFileRepo {
  saveFileData(fileData: FileData): Promise<string>;
  updateFileData(fileData: UploadedFileData): Promise<boolean>;
  getFileData(id: string): Promise<UploadedFileData>;
  getAllFileData(): Promise<UploadedFileData[]>;
  deleteFile(id: string): Promise<boolean>;
}

export default IFileRepo;
