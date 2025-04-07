import { CreateCategoryDto, CustomError } from '../../domain';
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
        const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

        if(error){
            res.status(400).json({error});
            return;
        }

        res.json(createCategoryDto);
    };

    public getCategory = async(req: Request, res: Response) => {
        res.json('Get Category');
    };
    
};