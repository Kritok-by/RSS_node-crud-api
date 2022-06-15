import { createServer } from 'http';
import 'dotenv/config';

import { enspointsHandler } from './endpoints/endpoints';

const server = createServer(enspointsHandler);

server.on('error', (error) => console.log(error.message));

server.listen(process.env.PORT, () =>
  console.log(`Server runnig on port ${process.env.PORT}`)
);
