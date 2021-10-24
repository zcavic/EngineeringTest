export interface FileData {
  originalName: string;
  uniqueFileName: string;
  fileSize: number;
  fileExtension: string;
  processingStatus: string;
}

export interface UploadedFileData extends FileData {
  id: string;
}
