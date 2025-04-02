import { bcryptAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError, RegisterUserDto, UserEntity } from '../../domain';

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

            return {
                user: userEntity, 
                token: 'ABC',
            };
        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }
}