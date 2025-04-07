export class CategoryEntity {
    private constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly available: boolean,
        public readonly user: string,
    ) {};

    static fromArrayObject(object: {[key:string]:any}[]): CategoryEntity[]{
        return object.map(item => new CategoryEntity(
            item.id,
            item.name,
            item.available,
            item.user,
        ));
    };
}