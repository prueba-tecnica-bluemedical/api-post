import 'dotenv/config';

const required = (value: string | undefined, key: string) => {
  if (!value) throw new Error(`Missing env var: ${key}`);
  return value;
};

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 3000),
  EXTERNAL_POSTS_URL: required(process.env.EXTERNAL_POSTS_URL, 'EXTERNAL_POSTS_URL'),
  REQUEST_LOG: process.env.REQUEST_LOG === 'true',
};
