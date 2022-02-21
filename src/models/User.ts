import { DefaultEntity } from '@decorators';
import { Order } from '@models';
import { Column, Entity, OneToMany, ValueTransformer } from 'typeorm';

const SALT_ROUNDS = 10;

const transformHashedValue: ValueTransformer = {
    to: (password: string): string => password,
    from: hash => hash,
}

@Entity()
export class User extends DefaultEntity {
    @Column()
    username: string;

    @Column({ select: false, transformer: transformHashedValue })
    password: string;

    @OneToMany(() => Order, order => order.customer)
    orders: Order[];
}
