// 装饰者模式
// 暴露一个简单的方法，在内部执行复杂操作，比如jQuery的.css方法
class Facade {
    _get() {
        console.log("current value:" + this.i);
    }
    _set(val) {
        this.i = val;
    }
    _run() {
        console.log("running");
    }
    facade(args) {
        this._set(args.val);
        this._get();
        if (args.run) {
            this._run();
        }
    }
}
let fa = new Facade();
fa.facade({ run: true, val: 10 });
