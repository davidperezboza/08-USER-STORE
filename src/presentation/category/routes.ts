import { Router } from 'express';
import { CategoryContoller } from './controller';

export class CategoryRoutes {
    static get routes(): Router {

    const router = Router();
    const controller = new CategoryContoller();
  
    router.get('/', controller.getCategory);
    router.post('/', controller.createCategory);

    return router;
  }
}