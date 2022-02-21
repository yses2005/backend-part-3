import * as express from 'express';
import * as logger from 'morgan';
import { router } from './router';

export class App {
    public app: express.Express;
    public port: number;

    constructor() {
        this.app = express();
        this.port = this.getPort();

        this.configureServer();
        this.configureRoutes();
    }

    private getPort = (): number => +process.env.PORT || 8081;

    private configureServer = (): void => {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(logger('dev'));
    }

    private configureRoutes = (): void => {
        this.app.use('/api/0.1', router);
    }

    public start = (): void => {
        this.app.listen(this.port, (): void => {
            console.log(`> Listening to port ${this.port}`);
        }).on('error', (err): void => {
            console.log(err);
        });
    }
}
