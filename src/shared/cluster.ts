import cluster from 'cluster';
import { cpus } from 'os';

export const createLoadBalancer = (callback: () => void) => {
  if (cluster.isPrimary) {
    const cp = cpus();

    console.log(`CPUs: ${cp.length}`);
    console.log(`Master started. Pid: ${process.pid}`);

    cp.forEach(() => {
      cluster.fork();
    });

    cluster.on('exit', (worker, code) => {
      console.log(`Worker died! Pid: ${worker.process.pid}. Code ${code}`);
      if (code === 1) {
        cluster.fork();
      }
    });
  }

  if (cluster.isWorker) {
    callback();
  }
};
