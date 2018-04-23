const Reflect = require('reflect-metadata');

class a {
    c() {
        return false;
    }
}

Reflect.defineMetadata('metadataKey', 'metadataValue', a.prototype, "method");

console.log(Reflect);
