const obj = {
    a: 1
};

const proxyObj = new Proxy(obj, {
    getPrototypeOf(target) {
        console.log(target);

        return Array.prototype;
    }
});

console.log(proxyObj.__proto__);
