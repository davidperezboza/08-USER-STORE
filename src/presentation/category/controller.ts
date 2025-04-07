import { CreateCategoryDto, CustomError, PaginationDto } from '../../domain';
import { Request, Response } from 'express';
import { CategoryService } from '../services';

export class CategoryContoller {
    constructor(
        private readonly categoryService: CategoryService,
    ){};

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError){
                return res.status(error.statusCode).json({error: error.message});
        };
    
        console.log(`${error}`);
        res.status(500).json({error: 'Internal server error'});
    };

    public createCategory = (req: Request, res: Response) => {
        const [error, createCategoryDto] = CreateCategoryDto.create(req.body);

        if(error){
            res.status(400).json({error});
            return;
        }

        this.categoryService.createCategory( createCategoryDto!, req.body.user )
            .then( category => res.status( 201 ).json( category ) )
            .catch( error => this.handleError( error, res ) );
  
    };

    public getCategory = (req: Request, res: Response) => {
        const {page = 1, limit = 10} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);

        if(error){
            res.status(400).json({error});
            return;
        };
        res.json(paginationDto);
        
        this.categoryService.getCategories()
            .then(categories => res.status(201).json(categories))
            .catch(error => this.handleError(error, res));
    };
    
};