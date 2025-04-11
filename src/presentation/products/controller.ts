import { CustomError, PaginationDto, CreateProductDto } from '../../domain';
import { Request, Response } from 'express';
import { ProductService } from '../services';

export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ){};

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError){
                return res.status(error.statusCode).json({error: error.message});
        };
    
        console.log(`${error}`);
        res.status(500).json({error: 'Internal server error'});
    };

    public createProduct = (req: Request, res: Response) => {
        const [error, createProductDto] = CreateProductDto.create({
            ...req.body,
            user: req.body.user.id});

        if(error){
            res.status(400).json({error});
            return;
        }

        this.productService.createProduct( createProductDto!)
            .then( product => res.status( 201 ).json( product ) )
            .catch( error => this.handleError( error, res ) );
  
    };

    public getProducts = (req: Request, res: Response) => {
        const {page = 1, limit = 10} = req.query;
        const [error, paginationDto] = PaginationDto.create(+page, +limit);

        if(error){
           res.status(400).json({error});
           return;
        };

        this.productService.getProducts(paginationDto!)
           .then(products => res.status(200).json(products))
           .catch(error => this.handleError(error, res));
    };
    
};