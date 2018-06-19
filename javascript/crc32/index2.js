var fs = require('fs');

// function hex(what) {
//     if (what < 0)
//         what = 0xFFFFFFFF + what + 1;
//     let result = what.toString(16);

//     return ('0000000' + result).slice(-8);
// }

function crc32(data) {
    const Polynomial = 0xEDB88320;
    let crc = 0xFFFFFFFF;
    let str = '';

    str = data.toString();

    for (let i = 0; i < str.length; i++) {
        crc ^= str.charCodeAt(i);

        for (let bit = 0; bit < 8; bit++) {
            if ((crc & 1) != 0)
                crc = (crc >>> 1) ^ Polynomial;
            else
                crc = crc >>> 1;
        }
    }

    return ~crc;
}

var data = fs.readFileSync('./a.txt');

let r = crc32(data);

const buffer = Buffer.alloc(32);

buffer.writeInt32LE(r);

console.log(buffer.readUInt32LE().toString(16));
