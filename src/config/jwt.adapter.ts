import jwt from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter{
    static generateToken = async (payload: any, duration: string = '2h') => {
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration as jwt.SignOptions['expiresIn'] }, (err, token) => {
        
                if ( err ) return resolve(null);
        
                resolve(token)
        
            });
        });
    }

    static validateToken = async <T> (token: string): Promise<T | null> => {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if(err) return resolve(null);

                resolve(decoded as T);
            });
        });
    };
}