let workerResult = '';

let worker = [];

onconnect = function (e) {
    const port = e.ports[0];

    port.onmessage = (e) => {
        self.console.log('123');
        if (e.data !== 'get') {
            worker.push(e.data.toString());
            workerResult = 'Add: success';
        } else {
            workerResult = JSON.stringify(worker);
        }
        port.postMessage(workerResult);
    }
}
