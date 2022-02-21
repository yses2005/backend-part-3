import { User } from '@models';
import { AuthException, Exception } from '@types';

export interface SessionToken {
    readonly auth: string;
    readonly refresh: string;
}

export interface TokenPayload {
    readonly user: User;
    readonly iat: number; // issued at
}

export class AuthHandler {
    readonly TOKEN_SECRET = 'padthebest';
    readonly TOKEN_EXPIRY = 60 * 5; // 5 mins

    async login(username: string, password: string): Promise<User> {
        const user = await User.createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.username = :username', { username })
            .getOne();

        if (!user) {
            throw new Exception(AuthException.USER_NOT_FOUND);
        }

        // We need to check if user entered a correct password
        // TODO: This won't work if the password is hashed
        if (user.password !== password) {
            throw new Exception(AuthException.INCORRECT_PASSWORD);
        }

        delete user.password;
        return user;
    }

    generateToken(user: User) {}
    validateToken(token: string) {}
}
