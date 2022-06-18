import { createServer } from 'http';
import 'dotenv/config';

import { enspointsHandler } from './endpoints/methodsProccessing';
import { createLoadBalancer } from './shared/cluster';

export const server = createServer(enspointsHandler);

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
