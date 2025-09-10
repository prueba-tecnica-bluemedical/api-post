import { Router } from 'express';
import { getPostsHandler, getPostsSummaryHandler } from './posts.controller';

export const postsRouter = Router();

postsRouter.get('/', getPostsHandler);              // /posts
postsRouter.get('/summary', getPostsSummaryHandler); // /posts/summary
