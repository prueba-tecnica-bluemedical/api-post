import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { requestLogger } from './shared/middlewares/requestLogger';
import { errorHandler } from './shared/middlewares/errorHandler';

export const buildApp = () => {
    const app = express();

    app.use(cors());
    app.use(helmet());
    app.use(express.json());

    app.use(requestLogger);

    //app.use('/posts');

    app.get('/health', (_req, res) => {
        res.status(200).json({ status: 'ok' });
    });

    app.use(errorHandler);

    return app;
}
