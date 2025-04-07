import { CustomError } from '../../domain';
import { Request, Response } from 'express';

export class CategoryContoller {
    constructor(){};

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError){
                return res.status(error.statusCode).json({error: error.message});
        };
    
        console.log(`${error}`);
        res.status(500).json({error: 'Internal server error'});
    };

    public createCategory = async(req: Request, res: Response) => {
        res.json('Create Category');
    };

    public getCategory = async(req: Request, res: Response) => {
        res.json('Get Category');
    };
    
};