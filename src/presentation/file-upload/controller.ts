import { CustomError} from '../../domain';
import { Request, Response } from 'express';
import { FileUploadService } from '../services';
import { UploadedFile } from 'express-fileupload';

export class FileUploadController {
    constructor(
        private readonly fileUploadService: FileUploadService,
    ){};

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError){
                return res.status(error.statusCode).json({error: error.message});
        };
    
        console.log(`${error}`);
        res.status(500).json({error: 'Internal server error'});
    };

    public uploadFile = (req: Request, res: Response) => {
        if (!req.files || Object.keys(req.files).length === 0) {
            res.status(400).json({errorr: 'No files were selected'});
            return;
        };     

        const file = req.files.file as UploadedFile;

        this.fileUploadService.uploadSingle(file)
            .then(uploaded => res.json(uploaded))
            .catch(error => this.handleError(error, res));
    };

    public uploadMultipleFile = (req: Request, res: Response) => {
        res.json('uploadMultipleFile');
     };
    
};