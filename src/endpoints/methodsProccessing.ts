import { IncomingMessage, ServerResponse } from 'http';
import { getBody } from '../shared/getters';
import {
  status400,
  status404,
  status500,
  status503,
} from '../shared/responses';
import { validate } from 'uuid';
import { deleteData, getData, postData, putData } from './enpointsProccessors';

const enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const enspointsHandler = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  if (process.env.LB) console.log(`Process pid: ${process.pid}`);

  try {
    if (!req.url?.includes('/api/users')) {
      status404(res, 'Bad request');
      return;
    }

    const id = req.url?.match(/\/api\/users\/\w+/) ? req.url.split('/')[3] : '';

    if (id && !validate(id) && req.method !== Methods.POST) {
      status400(res, `Incorrect id: "${id}"`);
      return;
    }

    let body: any;

    switch (req.method) {
      case Methods.GET:
        getData(res, id);
        break;
      case Methods.POST:
        body = await getBody(req, res);
        if (id) {
          status503(res);
          return;
        }
        postData(res, body);
        break;
      case Methods.PUT:
        body = await getBody(req, res);
        putData(res, id, body);
        break;
      case Methods.DELETE:
        deleteData(res, id);
        break;
      default:
        status503(res);
    }
  } catch (e) {
    status500(res);
  }
};
