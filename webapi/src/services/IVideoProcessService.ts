import { UploadedFileData } from '../model/FileData'

interface IVideoProcessService {
    processVideo(fileData: UploadedFileData): void;
}

export default IVideoProcessService;