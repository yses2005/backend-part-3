import { UserHandler } from '@handlers';
import { UserException } from '@types';
import { Response, Request, Router } from 'express';

export const UserEndpoint = Router();

const noOp = (): void => {};

const getUsers = async (_, res: Response) => {
    const handler = new UserHandler();
    const users = await handler.getAllUsers();

    return res.json({ users });
}

const createUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const handler = new UserHandler();

    try {
        const newUser = await handler.create(username, password);
        return res.json({ username: newUser.username });
    } catch (error) {
        if (error.code === UserException.USER_ALREADY_EXISTS) {
            return res.status(400).json(error);
        }
    }
};

UserEndpoint.get('/', getUsers);
UserEndpoint.post('/', createUser);
UserEndpoint.put('/', noOp);
UserEndpoint.delete('/', noOp);
