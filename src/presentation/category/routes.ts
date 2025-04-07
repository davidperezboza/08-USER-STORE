import { Router } from 'express';
import { CategoryContoller } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middelware';

export class CategoryRoutes {
    static get routes(): Router {

    const router = Router();
    const controller = new CategoryContoller();
  
    router.get('/', controller.getCategory);
    router.post('/', [AuthMiddleware.validateJWT], controller.createCategory);

    return router;
  }
}