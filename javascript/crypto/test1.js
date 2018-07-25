const crypto = require('crypto');

const curve = crypto.createECDH('secp256k1');

curve.generateKeys();

console.log(curve.getPrivateKey().toString('base64'));
console.log(curve.getPrivateKey('base64'));
console.log(curve.getPublicKey('base64'));
console.log('');
