export class CreateCategoryDto {
    private constructor(
        public readonly name: string,
        public readonly available: boolean,
    ){};

    public static create = (object: {[key:string]:any}) : [string?, CreateCategoryDto?] => {
        const {name, available = false} = object;
        let availableBoolean = available;

        if(!name) return ['Missing name'];
        if(typeof available !== 'boolean') {
            if(available !== 'true' && available !== 'false') return['available is not true or false'];
            availableBoolean = (available === 'true');
        };

        return [undefined, new CreateCategoryDto(name, availableBoolean)];
    };
};
