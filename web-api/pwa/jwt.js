const crypto = require('crypto');

function getFutureExpirationTimestamp(numSeconds) {
    const futureExp = new Date();
    futureExp.setSeconds(futureExp.getSeconds() + numSeconds);
    return Math.floor(futureExp.getTime() / 1000);
}

module.exports = function (key) {
    const header = {
        "typ": "JWT",
        "alg": "ES256"
    }
    const payload = {
        "aud": "https://fcm.googleapis.com",
        "exp": "1533842293",
        "sub": "mailto:web-push-book@haorooms.com"
    }

    const signature = [];
    signature.push(toBase64(JSON.stringify(header)));
    signature.push(toBase64(JSON.stringify(payload)));
    signature.push(toSafeString(crypto.createHmac('sha256', key).update(signature.join('.')).digest('base64')));

    return signature.join('.');
}

function toSafeString(string) {
    return string.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/g, '');
}

function toBase64(string) {
    const buffer = new Buffer(string);
    return buffer.toString('base64');
}
