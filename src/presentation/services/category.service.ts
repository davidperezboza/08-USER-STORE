import { CategoryModel } from '../../data';
import { CreateCategoryDto, CustomError, PaginationDto, UserEntity } from '../../domain';
import { CategoryEntity } from '../../domain/entities/category.entity';

export class CategoryService {
    constructor(){};
    
    public createCategory = async(createCategoryDto: CreateCategoryDto, user: UserEntity) => {
        const categoryExist = await CategoryModel.findOne({name: createCategoryDto.name});

        if(categoryExist) throw CustomError.badRequest('Category already exists');
        
        try {
            const category = new CategoryModel({
                ...createCategoryDto,
                user: user.id,
            });

            await category.save();

            return {
                id: category.id,
                name: category.name,
                available: category.available,
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    };

    public getCategories = async(paginationDto: PaginationDto) => {
        const {page, limit} = paginationDto;
    
        try {
            const total = await CategoryModel.countDocuments();
            const categories = await CategoryModel.find()
                .skip((page - 1) * limit)
                .limit(limit);
        
            const categoryEntity = CategoryEntity.fromArrayObject(categories);
            return {
                page: page,
                limit: limit,
                categories: categoryEntity,
            };
        } catch (error) {
            throw CustomError.internalServer();
        }
    }
};