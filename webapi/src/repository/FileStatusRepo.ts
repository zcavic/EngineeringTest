import { Schema, Model, model, connect } from 'mongoose';
import { FileData } from '../model/video';

export interface IFileRepo {
  saveFileData(fileData: FileData): Promise<void>;
}

export class FileRepo implements IFileRepo {
  private schema: Schema<FileData>;
  private model: Model<FileData>;
  private uri: string;

  constructor(uri: string) {
    this.schema = new Schema<FileData>({
      originalName: { type: String, required: true },
      uniqueFileName: { type: String, required: true },
      fileSize: { type: Number, required: true },
      fileExtension: { type: String, required: true },
      processingStatus: { type: String, required: true },
    });
    this.model = model<FileData>('UploadedFileData', this.schema);
    this.uri = uri;
  }

  public async saveFileData(fileData: FileData): Promise<void> {
    await connect(this.uri);
    const doc = new this.model({
      originalName: fileData.originalName,
      uniqueFileName: fileData.uniqueFileName,
      fileSize: fileData.fileSize,
      fileExtension: fileData.fileExtension,
      processingStatus: fileData.processingStatus,
    });

    await doc.save();
  }
}
