import { FileData, UploadedFileData } from '../model/FileData';
import { collections } from '../repository/FileDatabase';
import { ObjectId } from 'mongodb';
import IFileRepo from './IFileRepo'

class FileRepo implements IFileRepo {
  async saveFileData(fileData: FileData): Promise<string> {
    const result = await collections.fileData?.insertOne(fileData);
    if (!result) throw new Error('Failed to upload database.');
    return result.insertedId.toString();
  }
  async updateFileData(fileData: UploadedFileData): Promise<boolean> {
    const query = { _id: new ObjectId(fileData.id) };
    const result = await collections.fileData?.updateOne(query, {
      $set: fileData as FileData,
    });
    if (!result) throw new Error('Failed to upload database.');
    return result.acknowledged;
  }
  async getFileData(id: string): Promise<UploadedFileData> {
    const query = { _id: new ObjectId(id) };
    const uploadedFileData = (await collections.fileData?.findOne(query)) as UploadedFileData;
    return uploadedFileData;
  }
  async getAllFileData(): Promise<UploadedFileData[]> {
    const uploadedFileData = (await collections.fileData?.find({}).toArray()) as UploadedFileData[];
    return uploadedFileData;
  }
  async deleteFile(id: string): Promise<boolean> {
    const query = { _id: new ObjectId(id) };
    const result = await collections.fileData?.deleteOne(query);
    if (result && result.deletedCount) {
      return true;
    } else {
      return false;
    }
  }
}

export default FileRepo;
