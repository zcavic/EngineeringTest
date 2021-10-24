import { VideoProcessService } from './services/videoProcessService';

const amqpUrl = 'amqp://rabbitmq';
new VideoProcessService(amqpUrl, 'ScanService', 'Scan');
new VideoProcessService(amqpUrl, 'EditService', 'Edit');
new VideoProcessService(amqpUrl, 'PrepareService', 'Prepare');
new VideoProcessService(amqpUrl, 'FinishService', 'Finish');
