import { Router } from 'express-serve-static-core';

export interface IController {
  initializeRoutes(router: Router);
}
