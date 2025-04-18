export class LoginUserDto {
    private constructor(
        public readonly email: string,
        public readonly password: string,
    ){}

    static create = (object: {[key:string]:any}): [string?, LoginUserDto?] =>{
        const {email, password} = object;

        if(!email) return ['Missing email'];
        if(!password) return ['Missing paswword'];
        if(password.length < 6 ) return ['Password too short'];

        return [undefined, new LoginUserDto(email, password)]
    };
};