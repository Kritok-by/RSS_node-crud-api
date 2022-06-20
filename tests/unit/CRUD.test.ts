import request from 'supertest';
import { server } from '../../src/index';
import { IUser } from '../../src/shared/intefaces';
import { v4 as uuidv4 } from 'uuid';

export const API = '/api/users/';

export const postPayload = {
  username: 'Artyom',
  age: 28,
  hobbies: ['cooking', 'mounting'],
};

export const putPayload: IUser = {
  username: 'Art',
  age: 23,
  hobbies: ['mounting'],
};

describe('Test 1 (CRUD operations)', () => {
  let createdUser = {};
  let id: string;

  it('GET users', async () => {
    const { body, statusCode } = await request(server).get(API);

    expect(statusCode).toBe(200);
    expect(body).toHaveLength(0);
  });

  it('Create new user', async () => {
    const { body, statusCode } = await request(server)
      .post(API)
      .send(postPayload);

    id = body.id;
    createdUser = body;
    expect(statusCode).toBe(201);
    expect(body).toMatchObject(postPayload);
  });

  it('GET created user', async () => {
    const { body, statusCode } = await request(server).get(API + id);

    expect(statusCode).toBe(200);
    expect(body).toStrictEqual(createdUser);
  });

  it('Update created user', async () => {
    const { body, statusCode } = await request(server)
      .put(API + id)
      .send(putPayload);

    expect(statusCode).toBe(200);
    putPayload.id = id;
    expect(body).toStrictEqual(putPayload);
  });

  it('Delete created user', async () => {
    const { statusCode } = await request(server).delete(API + id);

    expect(statusCode).toBe(204);
  });

  it('Get deleted user', async () => {
    const { statusCode } = await request(server).get(API + id);

    expect(statusCode).toBe(404);
  });
});

describe("Test 2 (User does'nt exist)", () => {
  let createdUser = {};
  let id: string;

  it('Create new user', async () => {
    const { body, statusCode } = await request(server)
      .post(API)
      .send(postPayload);

    id = body.id;

    createdUser = body;
    expect(statusCode).toBe(201);
    expect(body).toMatchObject(postPayload);
  });

  it('GET user', async () => {
    const { statusCode } = await request(server).get(API + id);
    id = uuidv4();
    expect(statusCode).toBe(200);
  });

  it('Update user by another id', async () => {
    const { statusCode } = await request(server)
      .put(API + id)
      .send(putPayload);

    expect(statusCode).toBe(404);
  });

  it('Delete user by another id', async () => {
    const { statusCode } = await request(server).delete(API + id);

    expect(statusCode).toBe(404);
  });

  it('GET user by another id', async () => {
    const { statusCode } = await request(server).get(API + id);

    expect(statusCode).toBe(404);
  });
});

describe('Test 3 (Wrong id or data)', () => {
  let id: string;
  let wrongId: string;

  it('Create new user - without username', async () => {
    const wrongPayload = { ...putPayload };
    delete wrongPayload.username;
    const { statusCode } = await request(server).post(API).send(wrongPayload);

    expect(statusCode).toBe(400);
  });

  it('Create new user - without age', async () => {
    const wrongPayload = { ...putPayload };
    delete wrongPayload.age;
    const { statusCode } = await request(server).post(API).send(wrongPayload);

    expect(statusCode).toBe(400);
  });

  it('Create new user - without hobbies', async () => {
    const wrongPayload = { ...putPayload };
    delete wrongPayload.hobbies;
    const { statusCode } = await request(server).post(API).send(wrongPayload);

    expect(statusCode).toBe(400);
  });

  it('Create new user - with empty payload', async () => {
    const { statusCode } = await request(server).post(API).send({});

    expect(statusCode).toBe(400);
  });

  it('Create new user', async () => {
    const { body, statusCode } = await request(server)
      .post(API)
      .send(putPayload);

    expect(statusCode).toBe(201);
    id = body.id;
  });

  it('Get new user', async () => {
    const { statusCode } = await request(server).get(API + id);

    expect(statusCode).toBe(200);
  });

  it('Get new user - with wrong id', async () => {
    wrongId = id.slice(1);
    const { statusCode } = await request(server).get(API + wrongId);

    expect(statusCode).toBe(400);
  });

  it('Edit new user - without username', async () => {
    const wrongPayload = { ...putPayload };
    delete wrongPayload.username;
    const { statusCode } = await request(server).put(API).send(wrongPayload);

    expect(statusCode).toBe(400);
  });

  it('Edit new user - without age', async () => {
    const wrongPayload = { ...putPayload };
    delete wrongPayload.age;
    const { statusCode } = await request(server).put(API).send(wrongPayload);

    expect(statusCode).toBe(400);
  });

  it('Edit new user - without hobbies', async () => {
    const wrongPayload = { ...putPayload };
    delete wrongPayload.hobbies;
    const { statusCode } = await request(server).put(API).send(wrongPayload);

    expect(statusCode).toBe(400);
  });

  it('Edit new user - without payload', async () => {
    const { statusCode } = await request(server).put(API).send({});

    expect(statusCode).toBe(400);
  });

  it('Edit new user - without wrong id', async () => {
    const { statusCode } = await request(server)
      .put(API + wrongId)
      .send(putPayload);

    expect(statusCode).toBe(400);
  });

  it('Delete new user - with wrong id', async () => {
    const { statusCode } = await request(server).delete(API + wrongId);

    expect(statusCode).toBe(400);
  });
});
