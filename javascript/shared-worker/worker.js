let workerResult = '';

onconnect = function (e) {
    const port = e.ports[0];

    port.onmessage = (e) => {
        if (e.data !== 'get') {
            workerResult = 'Result: ' + e.data.toString();
        }
        port.postMessage(workerResult);
    }
}
