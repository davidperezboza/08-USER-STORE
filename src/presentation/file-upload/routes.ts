import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middelware';
import { FileUploadContoller } from '../category/controller';

export class FileUploadRoutes {
    static get routes(): Router {

    const router = Router();
    const controller = new FileUploadContoller;
  
    router.get('/', controller.getCategory);
    router.post('/', [AuthMiddleware.validateJWT], controller.createCategory);

    return router;
  }
}