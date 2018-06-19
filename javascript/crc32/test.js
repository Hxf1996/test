var fs = require('fs');

let Crc32Lookup = [];

for (let index = 0; index < 8; index++) {
    Crc32Lookup[index] = [];
}

let Polynomial = 0xEDB88320;

for (let i = 0; i <= 0xFF; i++) {
    let crc = i;
    for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ ((crc & 1) * Polynomial);
    }
    Crc32Lookup[0][i] = crc;
}

for (let i = 0; i <= 0xFF; i++) {
    Crc32Lookup[1][i] = (Crc32Lookup[0][i] >>> 8) ^ Crc32Lookup[0][Crc32Lookup[0][i] & 0xFF];
    Crc32Lookup[2][i] = (Crc32Lookup[1][i] >>> 8) ^ Crc32Lookup[0][Crc32Lookup[1][i] & 0xFF];
    Crc32Lookup[3][i] = (Crc32Lookup[2][i] >>> 8) ^ Crc32Lookup[0][Crc32Lookup[2][i] & 0xFF];
    Crc32Lookup[4][i] = (Crc32Lookup[3][i] >>> 8) ^ Crc32Lookup[0][Crc32Lookup[3][i] & 0xFF];
    Crc32Lookup[5][i] = (Crc32Lookup[4][i] >>> 8) ^ Crc32Lookup[0][Crc32Lookup[4][i] & 0xFF];
    Crc32Lookup[6][i] = (Crc32Lookup[5][i] >>> 8) ^ Crc32Lookup[0][Crc32Lookup[5][i] & 0xFF];
    Crc32Lookup[7][i] = (Crc32Lookup[6][i] >>> 8) ^ Crc32Lookup[0][Crc32Lookup[6][i] & 0xFF];
}

function crc32(data) {
    let crc = 0xFFFFFFFF;
    let str = '';

    str = data.toString();

    let length = str.length;

    while (length >= 4) {
        const crc1 = str.charCodeAt(data.length - length);
        const crc2 = str.charCodeAt(data.length - length + 1);
        const crc3 = str.charCodeAt(data.length - length + 2);
        const crc4 = str.charCodeAt(data.length - length + 3);
        const crc5 = crc1 | (crc2 << 8) | ( crc3 << 16) | (crc4 << 24);
        crc ^= crc5;

        crc = Crc32Lookup[3][crc & 0xFF] ^
            Crc32Lookup[2][(crc >>> 8) & 0xFF] ^
            Crc32Lookup[1][(crc >>> 16) & 0xFF] ^
            Crc32Lookup[0][crc >>> 24];
        length -= 4;
    }

    while (length) {
        crc = (crc >>> 8) ^ Crc32Lookup[0][(crc & 0xFF) ^ str.charCodeAt(data.length - length)];
        length--;
    }

    return ~crc;
}

// var data = fs.readFileSync('./javascript/crc32/a.txt');

let r = crc32('data');

const buffer = Buffer.alloc(32);

buffer.writeInt32LE(r);

console.log(buffer.readUInt32LE().toString(16));
