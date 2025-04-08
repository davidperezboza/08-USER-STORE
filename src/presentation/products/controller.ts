import { CreateCategoryDto, CustomError, PaginationDto } from '../../domain';
import { Request, Response } from 'express';

export class ProductController {
    constructor(
        //todo: private readonly productService: ProductService,
    ){};

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError){
                return res.status(error.statusCode).json({error: error.message});
        };
    
        console.log(`${error}`);
        res.status(500).json({error: 'Internal server error'});
    };

    public createProduct = (req: Request, res: Response) => {
        res.json('create Products');
        //const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
//
        //if(error){
        //    res.status(400).json({error});
        //    return;
        //}
//
        //this.categoryService.createCategory( createCategoryDto!, req.body.user )
        //    .then( category => res.status( 201 ).json( category ) )
        //    .catch( error => this.handleError( error, res ) );
  
    };

    public getProducts = (req: Request, res: Response) => {
        res.json('get Products');
        //onst {page = 1, limit = 10} = req.query;
        //onst [error, paginationDto] = PaginationDto.create(+page, +limit);

        //f(error){
        //   res.status(400).json({error});
        //   return;
        //;

        //his.categoryService.getCategories(paginationDto!)
        //   .then(categories => res.status(201).json(categories))
        //   .catch(error => this.handleError(error, res));
    };
    
};