import { PostsArraySchema } from './posts.schemas';
import { fetchExternalPosts } from './posts.repository';
import { HttpError } from '../shared/errors/HttpError';
import type {
  IGetPostsResult,
  IPost,
  IPostsSummary,
  IPostsSummaryItem,
  IPostsCount,
} from './posts.interface';

const sanitize = (posts: IPost[]): IPost[] =>
  posts.map(p => ({ ...p, name: p.name.trim(), comment: p.comment.trim() }));

const summarize = (posts: IPost[]): IPostsSummary => {
  const byName = new Map<string, number>();
  posts.forEach(p => byName.set(p.name, (byName.get(p.name) ?? 0) + 1));
  const byUser: IPostsSummaryItem[] = [...byName.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
  return { total: posts.length, byUser };
};

const getValidatedPosts = async (): Promise<IPost[]> => {
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
  return sanitize(parsed.data);
};

export const getPosts = async (nameFilter?: string): Promise<IPost[]> => {
  const posts = await getValidatedPosts();
  if (!nameFilter || !nameFilter.trim()) return posts;

  const q = nameFilter.trim().toLowerCase();
  return posts.filter(p => p.name.toLowerCase().includes(q));
};

export const getPostsCounts = async (nameFilter?: string): Promise<IPostsCount[]> => {
  const posts = await getValidatedPosts();

  const counts = new Map<string, number>();
  for (const p of posts) counts.set(p.name, (counts.get(p.name) ?? 0) + 1);

  let rows: IPostsCount[] = [...counts.entries()]
    .map(([name, postCount]) => ({ name, postCount }))
    .sort((a, b) => b.postCount - a.postCount || a.name.localeCompare(b.name));

  if (nameFilter && nameFilter.trim()) {
    const q = nameFilter.trim().toLowerCase();
    rows = rows.filter(r => r.name.toLowerCase().includes(q));
  }

  return rows;
};

export const getPostsAndSummary = async (): Promise<IGetPostsResult> => {
  const posts = await getValidatedPosts();
  const summary = summarize(posts);
  return { posts, summary };
};
