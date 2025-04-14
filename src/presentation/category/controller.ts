import { CustomError } from '../../domain';
import { Request, Response } from 'express';

export class FileUploadContoller {
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

    public uploadMultilpeFiles = (req: Request, res: Response) => {
        res.json('uploadMultilpeFiles');
    };

    
};