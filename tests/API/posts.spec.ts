import { test, expect } from '@playwright/test';

const BASE = 'https://jsonplaceholder.typicode.com';

test('GET /posts/1 devuelve 200 y la estructura esperada', async ({ request }) => {
  const res = await request.get(`${BASE}/posts/1`);
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body).toHaveProperty('id', 1);
  expect(body).toHaveProperty('title');
});

test('POST /posts crea un recurso', async ({ request }) => {
  const res = await request.post(`${BASE}/posts`, {
    data: { title: 'QA test', body: 'contenido', userId: 1 },
  });
  expect(res.status()).toBe(201);
  const body = await res.json();
  expect(body.title).toBe('QA test');
});

test('GET recurso inexistente devuelve 404', async ({ request }) => {
  const res = await request.get(`${BASE}/posts/99999`);
  expect(res.status()).toBe(404);
});