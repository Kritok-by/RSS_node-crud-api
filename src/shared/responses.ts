import { ServerResponse } from 'http';
import { IUserTable } from './intefaces';

export const status200 = (
  res: ServerResponse,
  body: IUserTable | IUserTable[]
) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
};

export const status201 = (res: ServerResponse, body: IUserTable) => {
  res.writeHead(201, { 'Content-Type': 'application/json' });

  res.end(JSON.stringify(body));
};

export const status204 = (res: ServerResponse, id: string) => {
  res.writeHead(204);
  res.end(`User "${id}" has been removed`);
};

export const status400 = (res: ServerResponse, message?: string) => {
  res.writeHead(400);
  res.end(message ? message : 'You need to set the user id');
};

export const status404 = (res: ServerResponse, message?: string) => {
  res.writeHead(404);
  res.end(message ? message : 'Bad request. This endpoit doesnt exist');
};

export const status500 = (res: ServerResponse) => {
  res.writeHead(500);
  res.end('An error 500 occurred on server');
};

export const status503 = (res: ServerResponse) => {
  res.writeHead(503);
  res.end('Service unavailable');
};
