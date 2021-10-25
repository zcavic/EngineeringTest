interface FileData {
  originalName: string;
  uniqueFileName: string;
  fileSize: number;
  fileExtension: string;
  processingStatus: string;
}

interface UploadedFileData extends FileData {
  id: string;
}

export { FileData, UploadedFileData };
