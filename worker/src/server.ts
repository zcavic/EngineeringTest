import * as dotenv from 'dotenv';
import { VideoProcessService } from './services/videoProcessService';

// use environment variables
dotenv.config();
const messageQueue = process.env.MESSAGE_QUEUE ? process.env.MESSAGE_QUEUE : '';

new VideoProcessService(messageQueue, 'ScanService', 'Scan');
new VideoProcessService(messageQueue, 'EditService', 'Edit');
new VideoProcessService(messageQueue, 'PrepareService', 'Prepare');
new VideoProcessService(messageQueue, 'FinishService', 'Finish');
