import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { server } from '../../src/index';
import { IUser } from '../../src/shared/intefaces';

const API = '/api/users/';

const postPayload = {
  username: 'Artyom',
  age: 28,
  hobbies: ['cooking', 'mounting'],
};

const putPayload: IUser = {
  username: 'Art',
  age: 23,
  hobbies: ['mounting'],
};

describe('Test 1', () => {
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

describe('Test 2', () => {
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
