import { VideoProcessService } from './services/videoProcessService';

new VideoProcessService('ScanService', 'Scan');
new VideoProcessService('EditService', 'Edit');
new VideoProcessService('PrepareService', 'Prepare');
new VideoProcessService('FinishService', 'Finish');
