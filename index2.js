const { links } = require('./test-urls');
const { Worker, workerData } = require('worker_threads');

const workers = [];

for (let i = 1; i < 3; i++) {
    let myWorker = new Worker('./worker.js', { workerData: i });
    workers.push(myWorker);

    myWorker.on('message', (e) => {
        console.log('Received message from worker ' + i, e);
    });

    myWorker.postMessage(links.slice(400 / i));
}
