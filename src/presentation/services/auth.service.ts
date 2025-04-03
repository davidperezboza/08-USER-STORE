import { bcryptAdapter, envs, JwtAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError, RegisterUserDto, UserEntity } from '../../domain';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';
import { EmailService } from './email.services';

export class AuthService {
    constructor(
        private readonly emailService: EmailService,
    ){};

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

            await this.sendEamilValidationLink(userEntity.email);

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

    private sendEamilValidationLink = async(email: string) => {
        const token = await JwtAdapter.generateToken({email});
        if(!token) throw CustomError.internalServer('Error while creating JWT');

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
        const html = `
            <h1>Validate your email<h1>
            <p>Click on the following link to validate your email</p>
            <a href="${link}">Validate your email: ${email}</a>
        `;

        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html,
        };

        const isSent = await this.emailService.sendEmail(options);

        if(!isSent) throw CustomError.internalServer('Error sending email');

        return isSent;
    };
}