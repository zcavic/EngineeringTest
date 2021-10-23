import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { Controller } from './controllers/controller.interface';

class App {
  public app: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.app = express();
    this.port = port;

    this.app.set('views', './src/views');
    this.app.set('view engine', 'ejs');

    this.initializeMiddleware();
    this.initializeHomepage();
    this.initializeControllers(controllers);
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

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
