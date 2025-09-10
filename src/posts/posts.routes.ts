import { Router } from "express";
import { getPostsHandler } from "./posts.controller";

export const postsRouter = Router();

postsRouter.get('/', getPostsHandler);