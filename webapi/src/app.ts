import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { Controller } from './controllers/controller.interface';

export class App {
  public app: Application;
  public port: number;
  public ready: Promise<any>;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    // Object readiness design pattern
    this.ready = new Promise(async (resolve) => {
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
