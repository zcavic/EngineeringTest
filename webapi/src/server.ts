import { App } from './app';
import { VideoController } from './controllers/videoController';
import { VideoProcessService } from './services/videoProcessService';

const videoProcessService = new VideoProcessService();
const videoController = new VideoController(videoProcessService);
const controllers = [videoController];

const app = new App(controllers, 5000);

app.ready.then(() => console.log('Server is up and running.'));
