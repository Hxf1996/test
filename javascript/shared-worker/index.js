const worker = new SharedWorker('worker.js');
console.log(worker);

worker.port.postMessage('get');
worker.port.postMessage('123123');
worker.port.postMessage('get');
worker.port.postMessage('123');
worker.port.postMessage('get');

worker.port.onmessage = (e) => {
    console.log(e);
}

worker.port.onerror = (e) => console.log;
worker.port.onmessageerror = (e) => console.log;