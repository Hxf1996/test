// 观察者模式
class Subject {
    addObserver() {
        throw new Error("This method must be overwritten!");
    }
    removeObserver() {
        throw new Error("This method must be overwritten!");
    }
    notify() {
        throw new Error("This method must be overwritten!");
    }
}

class Observer {
    update() {
        throw new Error("This method must be overwritten!");
    }
}

class Eye extends Subject {
    constructor() {
        super();
        this.observers = [];
    }
    addObserver(observer){
        this.observers.push(observer);
    }
    removeObserver(observer) {
        this.observers.forEach((item, index) => {
            if (item == observer) {
                this.observers.splice(index, 1);
            }
        });
    }
    notify(context) {
        this.observers.forEach((item) => {
            item.update(context);
        });
    }
}

class Hand extends Observer{
    constructor(context = ''){
        super();
        this.statu = context;
    }
    update(context){
        this.statu = context;
        console.log('hand', this.statu);
    }
}

class Foot extends Observer{
    constructor(context = ''){
        super();
        this.statu = context;
    }
    update(context){
        this.statu = context;
        console.log('foot', this.statu);
    }
}

const eye = new Eye();
const hand = new Hand();
const foot = new Foot();
eye.addObserver(hand);
eye.addObserver(foot);
eye.notify('close');
