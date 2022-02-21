import { App } from './app';
import { connection } from './config/database';

connection()
    .then(() => {
        console.log('> Successfully connected database');

        const server = new App();
        server.start();
    })
    .catch(({ code, sqlMessage }) => {
        console.log(`Failure to connect to database; ${sqlMessage} [${code}]`);
    });
