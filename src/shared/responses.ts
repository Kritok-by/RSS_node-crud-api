import { ServerResponse } from 'http';
import { IUserTable } from './intefaces';

export const status200 = (
  res: ServerResponse,
  body: IUserTable | IUserTable[]
) => {
  res.statusCode = 200;
  res.end(JSON.stringify(body));
};

export const status201 = (res: ServerResponse, body: IUserTable) => {
  res.statusCode = 201;
  res.end(JSON.stringify(body));
};

export const status204 = (res: ServerResponse, id: string) => {
  res.statusCode = 204;
  res.end(`User "${id}" has been removed`);
};

export const status400 = (res: ServerResponse, message?: string) => {
  res.statusCode = 400;
  res.end(message ? message : 'You need to set the user id');
};

export const status404 = (res: ServerResponse, message?: string) => {
  res.statusCode = 404;
  res.end(message ? message : 'Bad request. This endpoit doesnt exist');
};

export const status500 = (res: ServerResponse) => {
  res.statusCode = 500;
  res.end('An error 500 occurred on server');
};

export const status503 = (res: ServerResponse) => {
  res.statusCode = 503;
  res.end('Service unavailable');
};
