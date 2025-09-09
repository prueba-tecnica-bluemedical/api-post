import { Request, Response, NextFunction } from 'express';
import { env } from '../../config/env';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
    if (!env.REQUEST_LOG) return next();

    const start = process.hrtime.bigint();

    res.on('finish', () => {
        const end = process.hrtime.bigint();
        const ms = Number(end - start) / 1_000_000;

        console.log(`${req.method} ${req.originalUrl} - ${ms.toFixed(1)}ms`);
    });

    next();
}
