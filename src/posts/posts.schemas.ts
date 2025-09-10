import { z } from 'zod';

export const PostSchema = z.object({
    id: z.string().min(1),
    createdAt: z.coerce.date(),
    name: z.string().min(2).max(100),
    comment: z.string().min(2).max(1000),
});

export const PostsArraySchema = z.array(PostSchema);