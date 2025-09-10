import type { Request, Response, NextFunction } from 'express';
import { getPostsAndSummary } from './posts.service';

export const getPostsHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { posts, summary } = await getPostsAndSummary();

    if (req.query.view === 'array') {
      return res.json(posts);
    }

    // por defecto: data + summary
    return res.json({ data: posts, summary });
  } catch (err) {
    next(err);
  }
};
