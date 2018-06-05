const net = require('net');
const fs = require('fs');

const HOST = '127.0.0.1';
const PORT = 9001;
let needRead = 0;
let datas = [];


const client = net.connect(PORT, HOST, (params) => {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    // client.write('LIST\r\n');
    const filename = '1.png';
    client.write(`GET ${filename}\r\n`);
});

client.on('data', (data) => {
    datas.push(data);
});

client.on('close', function() {
    console.log('Connection closed');
});

function parseData(data) {
    let state = true;
    let point = 0;
    const result = [];
    while (state) {
        const header = data.readInt32LE(point);
        const type = header & 0xc0000000;
        const dataLength = header & ~type;
        const body = data.slice(point + 4, point + 4 + dataLength);

        result.push({
            type: type >> 30,
            dataLength,
            data: body,
        });
        
        point += 4 + dataLength;
        if (type === (0x80000000 | 0x00000001 - 1)) {
            state = false;
        }
    }
    return result;
}

setTimeout(() => {
    const result = parseData(Buffer.concat(datas));
    const file = {
        name: '',
        crc32: '',
        fileLength: 0,
        data: [],
    };
    result.map((item) => {
        switch (item.type) {
            case 0:
                file.name = item.data.toString('utf-8', 12);
                file.crc32 = item.data.readInt32LE(0);
                file.fileLength = item.data.readInt32LE(4);
                break;
            case 1:
                file.data.push(item.data);
                break;
        }
    });
    fs.writeFile(file.name, Buffer.concat(file.data));
}, 1000);
