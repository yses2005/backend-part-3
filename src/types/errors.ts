export enum AuthException {
    USER_NOT_FOUND = 'USER_NOT_FOUND',
    INCORRECT_PASSWORD = 'INCORRECT_PASSWORD',
    INCORRECT_USERNAME_PASSWORD = 'INCORRECT_USERNAME_PASSWORD',
    INVALID_TOKEN = 'INVALID_TOKEN',
    TOKEN_EXPIRED = 'TOKEN_EXPIRED',
    ACCESS_DENIED = 'ACCESS_DENIED',
}

export enum UserException {
    USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
}

export type ExceptionType =
    | AuthException
    | UserException;

export class Exception<T = undefined> {
    constructor(
        public readonly code: ExceptionType,
        public readonly message?: string,
        public readonly data?: T,
    ) {}
}
