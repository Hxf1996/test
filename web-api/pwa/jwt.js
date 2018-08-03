const crypto = require('crypto');

module.exports = function (key) {
    const header = {
        "alg": "HS256",
        "typ": "JWT"
    }
    const payload = {
        "aud": "https://some-push-service.org",
        "exp": "1469618703",
        "sub": "mailto:example@web-push-book.org"
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
