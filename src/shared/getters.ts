import { IncomingMessage, ServerResponse } from 'http';
import { status404 } from './responses';

export const getBody = (req: IncomingMessage, res: ServerResponse) => {
  return new Promise((resolve, reject) => {
    let body: string;

    req.on('data', (chunk) => {
      body = chunk.toString();
    });

    req.on('end', () => {
      try {
        const response = JSON.parse(body);
        resolve(response);
      } catch (err) {
        status404(res, 'Bad request');
        reject(err);
      }
    });
    req.on('error', (err) => reject(err));
  });
};
