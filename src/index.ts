import { createServer } from 'http';
import 'dotenv/config';

import { enspointsHandler } from './endpoints/endpoints';
import { createProcesses } from './shared/cluster';

export const server = createServer(enspointsHandler);

server.on('error', (error) => console.log(error.message));

if(process.env.LB){
  createProcesses(() =>
    server.listen(process.env.PORT, () =>
      console.log(
        `Server runnig on port ${process.env.PORT}`,
        `Proccess ${process.pid} started`
      )
    )
  );
} else {
  server.listen(process.env.PORT, () =>
    console.log(
      `Server runnig on port ${process.env.PORT}`,
      `Proccess ${process.pid} started`
    )
  )
}
