import { createServer } from 'http';
import 'dotenv/config';

import { enspointsHandler } from './endpoints/methodsProccessing';
import { createLoadBalancer } from './shared/cluster';
import { IUserTable } from './shared/intefaces';
import { usersTable as table } from './db/db';

export const server = createServer((req, res) => {
  if (process.env.LB) {
    console.log(`Process pid: ${process.pid}`);
    (<any>process).send({ method: 'get' });
    process.on('message', async (usersTable: IUserTable[]) => {
      enspointsHandler(req, res, usersTable);
    });
  } else {
    enspointsHandler(req, res, table);
  }
});

if (process.env.LB) {
  createLoadBalancer(() =>
    server.listen(process.env.PORT, () =>
      console.log(
        `Server runnig on port ${process.env.PORT}`,
        `Proccess ${process.pid} started`
      )
    )
  );
} else {
  if (!process.env.TEST) {
    server.listen(process.env.PORT, () => {
      console.log(`Server runnig on port ${process.env.PORT}`);
    });
  }
}

server.on('error', (error) => console.log(error.message));
