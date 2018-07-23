require('reflect-metadata');

class Example {
    // property declarations are not part of ES6, though they are valid in TypeScript:
    // static staticProperty;
    // property;

    constructor(p) { }
    static staticMethod(p) { }
    method(p) { }
}

const options = 1;

// constructor
Reflect.defineMetadata("custom:annotation", options, Example);
// property (on constructor)
Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");

// property (on prototype)
Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");

// method (on constructor)
Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");

// method (on prototype)
Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");

let result = Reflect.getMetadata('custom:annotation', Example);

console.log(Example, result);
