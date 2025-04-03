import { bcryptAdapter, JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError, RegisterUserDto, UserEntity } from '../../domain';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';

export class AuthService {
    public async registerUser(registerUserDto: RegisterUserDto){
        const existUser = await UserModel.findOne({
            email: registerUserDto.email,
        });

        if (existUser) throw CustomError.badRequest('Email already exists');

        try {
            const user = new UserModel(registerUserDto);
            user.password = bcryptAdapter.hash(registerUserDto.password);

            await user.save();

            const {password, ...userEntity} = UserEntity.fromObject(user);
            const token = await JwtAdapter.generateToken({id: userEntity.id});
            if(!token) throw CustomError.internalServer('Error while creating JWT');
            return {
                user: userEntity, 
                token,
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public loginUser = async(loginUserDto: LoginUserDto)=> {
        const user = await UserModel.findOne({
            email: loginUserDto.email,
        });

        if (!user) throw CustomError.badRequest('Email not registred');
        if (!bcryptAdapter.compare(loginUserDto.password, user.password!)) throw CustomError.badRequest('Password is not valid');
        const {password, ...userEntity}= UserEntity.fromObject(user);
        const token = await JwtAdapter.generateToken({id: userEntity.id});
        if(!token) throw CustomError.internalServer('Error while creating JWT');
        return {
            user: userEntity,
            token,
        }
    };
}