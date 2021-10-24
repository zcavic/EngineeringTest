import express, { Express } from 'express';
import { IController } from './controllers/IController';

export class App {
  public app: Express;
  public port: number;

  constructor(controllers: IController[], port: number) {
    this.app = express();
    this.port = port;
    this.initializeControllers(controllers);
  }

  private initializeControllers(controllers: IController[]) {
    controllers.forEach((controller) => {
      controller.initializeRoutes(this.app);
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
