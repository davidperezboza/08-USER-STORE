import { CustomError} from '../../domain';
import { Request, Response } from 'express';

export class FileUploadController {
    constructor(
        //private readonly categoryService: CategoryService,
    ){};

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError){
                return res.status(error.statusCode).json({error: error.message});
        };
    
        console.log(`${error}`);
        res.status(500).json({error: 'Internal server error'});
    };

    public uploadFile = (req: Request, res: Response) => {
       res.json('uploadFile');
    };

    public uploadMultipleFile = (req: Request, res: Response) => {
        res.json('uploadMultipleFile');
     };
    
};