import { User } from '@models';
import { Exception, UserException } from '@types';

export class UserHandler {
    async getAllUsers(): Promise<User[]> {
        const users = await User.find();
        return users;
    }

    async create(username: string, password: string): Promise<User> {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Exception(UserException.USER_ALREADY_EXISTS, 'User already exists');
        }

        const user = new User();
        Object.assign(user, { username, password });
        await user.save();

        return user;
    }

    async updatePassword(username: string, password: string) {}
    async delete(username: string) {}
}
