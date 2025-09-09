import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/HttpError';
import { env } from '../../config/env';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const status = err instanceof HttpError ? err.statusCode : 500;
    const message = err instanceof HttpError ? err.message : 'Internal Server Error';

    if (env.NODE_ENV === 'development') {
        console.error('Error:', err);
    }

    res.status(status).json({ status: status, error: message });
}
