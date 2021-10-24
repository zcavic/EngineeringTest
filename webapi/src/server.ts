import { App } from './app';
import { VideoProcessingController } from './controllers/VideoProcessingController';
import { VideoProcessService } from './services/videoProcessService';
import { VideoUploadController } from './controllers/VideoUploadController';
import {
  FileSizeValidator,
  FileTypeValidator,
} from './validators/fileValidator';
import { connectToDatabase } from './repository/FileDatabase';
import {FileRepo} from './repository/FileRepo'

//connect to database
connectToDatabase();
const fileRepo = new FileRepo();

// VideoProcessService
//const amqpUrl = 'amqp://rabbitmq';
const amqpUrl = 'amqp://localhost';
const videoProcessService = new VideoProcessService(amqpUrl);
const videoController = new VideoProcessingController(videoProcessService, fileRepo);

// VideoUploadController
const fileSizeValidator = new FileSizeValidator(20971520); // 20MB
const fileTypeValidator = new FileTypeValidator(new Array('mp4'));
const fileUploadController = new VideoUploadController();

const controllers = [fileUploadController, videoController];

const app = new App(controllers, 5000);
app.listen();
