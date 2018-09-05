class a {
    constructor() {
        console.log(this);
    }
}

class b extends a {
    constructor() {
        super();
        this.d = 123;
    }
}

const d = Object.getPrototypeOf(b) === a.prototype.constructor

const c = new b();

console.log(1);
