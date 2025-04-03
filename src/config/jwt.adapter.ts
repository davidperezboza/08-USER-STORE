import jwt from 'jsonwebtoken';

export class JwtAdapter{
    static generateToken = async (payload: any, duration: string = '2h') => {
        return new Promise((resolve) => {
            jwt.sign(payload, "SEED", { expiresIn: duration as jwt.SignOptions['expiresIn'] }, (err, token) => {
        
                if ( err ) return resolve(null);
        
                resolve(token)
        
            });
        });
    }

    static validateToken = (token: string) => {

    };
}