var fs = require('fs');

function crc32(Instr) {
    const Crc32Table = new Array(256);
    var i, j;
    var Crc;
    for (i = 0; i < 256; i++) {
        Crc = i;
        for (j = 0; j < 8; j++) {
            if (Crc & 1)
                Crc = ((Crc >>> 1) & 0x7FFFFFFF) ^ 0xEDB88320;
            else
                Crc = ((Crc >>> 1) & 0x7FFFFFFF);
        }
        Crc32Table[i] = Crc;
    }
    if (typeof Instr != "string") Instr = "" + Instr;
    Crc = 0xFFFFFFFF;
    for (i = 0; i < Instr.length; i++)
        Crc = ((Crc >>> 8) & 0x00FFFFFF) ^ Crc32Table[(Crc & 0xFF) ^ Instr.charCodeAt(i)];
    Crc ^= 0xFFFFFFFF;
    return Crc;
}

var data = fs.readFileSync('./a.txt');

let r = crc32(data);

// const buffer = Buffer.alloc(32);

// buffer.writeInt32LE(r);

// console.log(buffer.readUInt32LE().toString(16));


// e8b7be43
console.log(((r & 0xFF000000) >>> 24).toString(16).padStart(2, '0') +
((r & 0x00FF0000) >>> 16).toString(16).padStart(2, '0') +
((r & 0x0000FF00) >>> 8).toString(16).padStart(2, '0') +
(r & 0x000000FF).toString(16).padStart(2, '0'));
