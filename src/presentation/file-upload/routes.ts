import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middelware';

export class FileUploadRoutes {
    static get routes(): Router {

    const router = Router();
    const categoryService = new CategoryService();
    const controller = new CategoryContoller(categoryService);
  
    router.get('/', controller.getCategory);
    router.post('/', [AuthMiddleware.validateJWT], controller.createCategory);

    return router;
  }
}