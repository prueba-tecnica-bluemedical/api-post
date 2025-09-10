import type { Request, Response, NextFunction } from 'express';
import { getPosts, getPostsCounts } from './posts.service';

export const getPostsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = typeof req.query.name === 'string' ? req.query.name : undefined;
    const data = await getPosts(name);
    return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getPostsSummaryHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = typeof req.query.name === 'string' ? req.query.name : undefined;
    const rows = await getPostsCounts(name);
    return res.json(rows);
  } catch (err) {
    next(err);
  }
};
