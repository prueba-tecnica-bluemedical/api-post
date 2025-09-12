process.env.EXTERNAL_POSTS_URL = 'http://mockapi.test/api/posts';

import { expect } from 'chai';
import request from 'supertest';
import nock from 'nock';
import { buildApp } from '../src/app';

const external = new URL(process.env.EXTERNAL_POSTS_URL!);
const host = `${external.protocol}//${external.hostname}${external.port ? `:${external.port}` : ''}`;
const path = external.pathname;

console.log('EXTERNAL_POSTS_URL', process.env.EXTERNAL_POSTS_URL);
console.log('nock host:', host, 'path:', path);


describe('Integration: /posts', () => {
  const app = buildApp();

  it('Cuando el API externo falla -> nuestra API responde 500 con { status, error }', async () => {
    nock(host).get(path).reply(500, { error: 'boom' });

    const res = await request(app).get('/api/posts').expect(500);

    expect(res.body).to.have.property('status', 500);
    expect(res.body).to.have.property('error').that.is.a('string');
  });
});
