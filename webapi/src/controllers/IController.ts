import { Router } from 'express-serve-static-core';

interface IController {
  initializeRoutes(router: Router): void;
}

export default IController;
