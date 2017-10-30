class Ioc {
    constructor() {
        this.container = [];
    }

    bind(name, load) {
        this.container[name] = load;
    }

}

var ioc = new Ioc();

ioc.bind('qq', function() {
    console.log(123);
});

console.log(ioc);
