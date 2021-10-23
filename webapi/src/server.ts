import App from './app';
import VideoController from './controllers/videoController';
import { Consumer } from './workQueue/consumer';
import { Publisher } from './workQueue/publisher';

const app = new App(
  [new VideoController()],
  5000,
  new Consumer(),
  new Publisher()
);

app.ready.then(() => console.log('Server is up and running.'));
