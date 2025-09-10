import { api } from '../shared/http/httpClient';
import { env } from '../config/env';

export const fetchExternalPosts = async (): Promise<unknown> => {
  const { data } = await api.get(env.EXTERNAL_POSTS_URL + '/posts');
  return data;
};
