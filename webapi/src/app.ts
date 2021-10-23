import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { Controller } from './controllers/controller.interface';
import { Consumer } from './workQueue/consumer';
import { Publisher } from './workQueue/publisher';

class App {
  public app: Application;
  public port: number;
  public consumer: Consumer;
  public publisher: Publisher;
  public ready: Promise<any>;

  constructor(
    controllers: Controller[],
    port: number,
    consumer: Consumer,
    publisher: Publisher
  ) {
    this.app = express();
    this.port = port;
    this.consumer = consumer;
    this.publisher = publisher;
    // Object readiness design pattern
    this.ready = new Promise(async (resolve) => {
      await consumer.connect();
      consumer.consume();
      await publisher.connect();
      await this.listen();
      this.initializeMiddleware();
      this.initializeHomepage();
      this.initializeControllers(controllers);
      resolve(undefined);
    });

    this.app.set('views', './src/views');
    this.app.set('view engine', 'ejs');
  }

  private initializeMiddleware() {
    this.app.use(bodyParser.json());
    this.app.use('/start', this.publisher.publish.bind(this.publisher));
    console.log('Middleware initialized.');
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  private initializeHomepage() {
    this.app.get('/', (req, res) => {
      res.render('index');
    });
  }

  private async listen(): Promise<void> {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
