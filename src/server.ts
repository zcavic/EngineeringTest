import App from './app';
import VideoController from './controllers/videoController';

const app = new App([new VideoController()], 5000);

app.listen();
