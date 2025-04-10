export class CreateProductDto {
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string,
        public readonly category: string,
    ){
    };

    static create = (object: { [key: string]: unknown }): [string?, CreateProductDto?] => {
        const { name, available, price, description, user, category } = object;
    
        if (typeof name !== 'string') return ['Invalid or missing name'];
        if (typeof user !== 'string') return ['Invalid or missing user'];
        if (typeof category !== 'string') return ['Invalid or missing category'];
    
        // Para los opcionales, también puedes validar si quieres
        const validAvailable = typeof available === 'boolean' ? available : false;
        const validPrice = typeof price === 'number' ? price : 0;
        const validDescription = typeof description === 'string' ? description : '';
    
        return [undefined, new CreateProductDto(name, validAvailable, validPrice, validDescription, user, category)];
    };
};