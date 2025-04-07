import { Router } from 'express';
import { CategoryContoller } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middelware';
import { CategoryService } from '../services';

export class CategoryRoutes {
    static get routes(): Router {

    const router = Router();
    const categoryService = new CategoryService();
    const controller = new CategoryContoller(categoryService);
  
    router.get('/', controller.getCategory);
    router.post('/', [AuthMiddleware.validateJWT], controller.createCategory);

    return router;
  }
}