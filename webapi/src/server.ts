import * as dotenv from 'dotenv';
import * as Amqp from 'amqp-ts';
import multer from 'multer';
import App from './app';
import { connectToDatabase } from './repository/FileDatabase';
import FileRepo from './repository/FileRepo';
import VideoProcessService from './services/videoProcessService';
import VideoUploadService from './services/VideoUploadService';
import { initializeFileSizeValidator, initializeFileTypeValidator } from './services/validators/fileValidator';
import VideoDataController from './controllers/VideoDataController';
import VideoUploadController from './controllers/VideoUploadController';
import VideoProcessingController from './controllers/VideoProcessingController';

// use environment variables
dotenv.config();

//connect to database
connectToDatabase();
const fileRepo = new FileRepo();

// initialize rabbitmq
const connection = new Amqp.Connection(process.env.MESSAGE_QUEUE);

// Initialize services
initializeFileSizeValidator(20971520); // 20MB
initializeFileTypeValidator(['.mp4', '.jpg']);
const videoProcessService = new VideoProcessService(fileRepo, connection);
const fileUploadService = new VideoUploadService(fileRepo);

// Initialize controllers
const videoDataController = new VideoDataController(fileRepo);
const videoController = new VideoProcessingController(videoProcessService);
const fileUploadController = new VideoUploadController(fileUploadService, multer({ dest: './public/data/uploads/' }));
const controllers = [videoDataController, fileUploadController, videoController];

const app = new App(controllers, 5000);
app.listen();
