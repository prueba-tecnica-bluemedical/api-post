import { PostsArraySchema } from './posts.schemas';
import { fetchExternalPosts } from './posts.repository';
import { HttpError } from '../shared/errors/HttpError';
import type { IGetPostsResult, IPost, IPostsSummary } from './posts.interface';

const sanitize = (posts: IPost[]): IPost[] =>
  posts.map(p => ({
    ...p,
    name: p.name.trim(),
    comment: p.comment.trim(),
  }));

const summarize = (posts: IPost[]): IPostsSummary => {
  const byName = new Map<string, number>();
  posts.forEach(p => byName.set(p.name, (byName.get(p.name) ?? 0) + 1));

  const byUser = [...byName.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  return { total: posts.length, byUser };
};

export const getPostsAndSummary = async (): Promise<IGetPostsResult> => {
  let raw: unknown;
  try {
    raw = await fetchExternalPosts();
  } catch {
    throw new HttpError(500, 'No se pudo obtener información del API externo');
  }

  const parsed = PostsArraySchema.safeParse(raw);
  if (!parsed.success) {
    throw new HttpError(500, 'Respuesta inválida del API externo');
  }

  const posts = sanitize(parsed.data);
  const summary = summarize(posts);
  return { posts, summary };
};
