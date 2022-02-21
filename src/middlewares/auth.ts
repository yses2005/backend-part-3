import { AuthException } from '@types';
import { AuthHandler } from '@handlers';
import { NextFunction, Response, Request } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const { authorization = '' } = req.headers;
    const handler = new AuthHandler();

    const [, token] = authorization.match(/^Bearer (.+)$/) || [];

    if (!token) {
        return res.status(401).json({
            code: AuthException.ACCESS_DENIED,
            message: 'Access is denied.',
        });
    }

    try {
        handler.validateToken(token);
    } catch (error) {
        return res.status(401).json(error);
    }

    return next();
}
