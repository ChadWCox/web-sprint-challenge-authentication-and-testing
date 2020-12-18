const request = require('supertest');
const server = require('./server.js');
const db = require('../data/dbConfig');
const jokes = require('../api/jokes/jokes-data');

const chad = {username: 'Chad', password: 'cox'};

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest();
})

beforeEach(async () => {
  await db('users').truncate()
})

afterAll(async () => {
  await db.destroy()
})

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

describe('Endpoints', () => {
  describe('[POST] /api/auth/register', () => {
    it('resturns the new user', async () => {
      const res = await request(server).post('/api/auth/register').send(chad);
      expect(res.body.id).toBe(1);
      expect(res.body.username).toBe('Chad');
    })
    it('if we add user twice responds with "username taken"', async () => {
      await request(server).post('/api/auth/register').send(chad);
      const res = await request(server).post('/api/auth/register').send(chad);
      expect(JSON.stringify(res.body)).toMatch(/username taken/)
    })
  })
  describe('[POST] /api/auth/login', () => {
    it('returns a welcome message with username', async () => {
      await request(server).post('/api/auth/register').send(chad);
      const res = await request(server).post('/api/auth/login').send(chad);
      expect(res.status).toBe(200);
      expect(res.body.message).toMatch(/welcome, Chad/)
    })
    it('returns a token when loggin in', async () => {
      await request(server).post('/api/auth/register').send(chad);
      const res = await request(server).post('/api/auth/login').send(chad);
      expect(res.body).toHaveProperty('token');
    })
  })
  describe('[GET] /api/jokes', () => {
    it('response is an array', async () => {
      await request(server).post('/api/auth/register').send(chad);
      await request(server).post('/api/auth/login').send(chad);
      expect(jokes).toBeInstanceOf(Array)
    })
    it('expect jokes to have a length of 3', async () => {
      await request(server).post('/api/auth/register').send(chad);
      await request(server).post('/api/auth/login').send(chad);
      expect(jokes).toHaveLength(3);
    })
  })

})
  //[POST] register
  //[POST] login
  //[GET] Jokes

