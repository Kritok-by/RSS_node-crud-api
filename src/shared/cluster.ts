import cluster from 'cluster';
import { cpus } from 'os';
import { IUserTable } from './intefaces';

export const createLoadBalancer = (callback: () => void) => {
  if (cluster.isPrimary) {
    let usersTable = [] as IUserTable[];
    let pocessCount = [1] as any[];

    if (process.env.LB) {
      pocessCount = cpus();
    }

    console.log(`CPUs: ${pocessCount.length}`);
    console.log(`Master started. Pid: ${process.pid}`);

    pocessCount.forEach(() => {
      const worker = cluster.fork();
      worker.on('message', ({ method, data }) => {
        switch (method) {
          case 'get':
            worker.send(usersTable);
            break;
          case 'post':
            usersTable = data;
        }
      });
    });

    cluster.on('exit', (worker, code) => {
      console.log(`Worker died! Pid: ${worker.process.pid}. Code ${code}`);
      if (code === 1) {
        const worker = cluster.fork();
        worker.on('message', ({ method, data }) => {
          console.log(method, data);
          switch (method) {
            case 'get':
              worker.send(usersTable);
              break;
            case 'post':
              usersTable = data;
              break;
          }
        });
      }
    });
  }

  if (cluster.isWorker) {
    callback();
  }
};
