import { Router } from 'express-serve-static-core';

interface IController {
  initializeRoutes(router: Router);
}

export default IController;
