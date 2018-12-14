class MyArray extends Array {
    static get [Symbol.species]() {
        console.log(1);
        return Array;
    }

    static get a() { return '1' }
}

class MyArray1 extends Array {
    static get a() { return '1' }
}

const a = new MyArray(1, 2);
const b = new MyArray1(1, 2);
console.log(b.__proto__.constructor);
console.log(a.__proto__.constructor);

