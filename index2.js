const { links } = require('./test-urls');
const { Worker, workerData } = require('worker_threads');

const workers = [];

let successes = 0;
// only for reducing number of links when testing stuff
links.splice(0, links.length - 23);

const numberOfWorkers = 5;
const numberOfLinks = links.length;
const spliceEnd = Math.ceil(numberOfLinks / numberOfWorkers);
console.log('Number of links', links.length);
console.log('spliceEnd', spliceEnd);

for (let i = 1; i <= numberOfWorkers; i++) {
    console.log('Worker created');
    let myWorker = new Worker('./worker.js', { workerData: i });
    workers.push(myWorker);

    myWorker.on('message', (e) => {
        console.log('Received message from worker ' + i, e);
        successes = successes + e.result;
        console.log('Total successes', successes);
    });

    let linksToGoTo = links.splice(0, spliceEnd);
    myWorker.postMessage(linksToGoTo);
}
